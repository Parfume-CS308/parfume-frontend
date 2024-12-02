import React, { useEffect, useState } from "react";
import { getOrdersRequest } from "@/api";
import { Order } from "@/types/orderTypes.ts"; // Adjust the import path as needed

interface OrderItem {
  perfumeId: string;
  volume: number;
  quantity: number;
  price: number;
  totalPrice: number;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const getStatusBadge = (status: Order["status"]) => {
    const styles = {
      PROCESSING: "bg-blue-100 text-blue-800",
      SHIPPED: "bg-amber-100 text-amber-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
      >
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Loading orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">My Orders</h1>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-500 mb-4">
              You haven't placed any orders yet.
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">
                        Order #{order.orderId.slice(-8)}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on{" "}
                      {format(new Date(order.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-lg font-bold">${order.totalAmount}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className={`py-4 flex items-center justify-between ${
                      index < order.items.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{item.perfumeId}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">
                            {item.volume}ml
                          </span>
                          <span className="text-sm text-gray-500">×</span>
                          <span className="text-sm text-gray-500">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.totalPrice}</p>
                      <p className="text-sm text-gray-500">
                        ${item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="p-6 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </div>
                {order.status === "DELIVERED" && (
                  <Button variant="outline">Request Refund</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
