import React, { useEffect, useState } from "react";
import { getOrdersRequest } from "@/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface OrderItem {
  perfumeId: string;
  volume: number;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface Order {
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  appliedCampaigns: any[];
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await getOrdersRequest();
      setOrders(response.data.items || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status.toLowerCase() === activeTab;
  });

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      PROCESSING: "bg-blue-100 text-blue-800",
      SHIPPED: "bg-yellow-100 text-yellow-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            Order #{order.orderId.slice(-8)}
          </h3>
          <p className="text-sm text-gray-500">
            {format(new Date(order.createdAt), "MMM dd, yyyy")}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium">{item.perfumeId}</p>
                <p className="text-sm text-gray-500">
                  {item.volume}ml × {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-medium">${item.totalPrice}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center pt-4 border-t">
        <div>
          <span className="text-sm text-gray-500">Total Amount</span>
          <p className="font-semibold">${order.totalAmount}</p>
        </div>
        {order.status === "DELIVERED" && (
          <Button variant="outline">Request Refund</Button>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading orders...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg">
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrdersPage;
