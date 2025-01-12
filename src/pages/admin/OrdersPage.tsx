import React, { useEffect, useState } from "react";
import {
  getAllOrdersRequest,
  getOrdersRequest,
  updateOrderStatusRequest,
} from "@/api"; // Adjust the import path as necessary
import { AdminOrder, Order, OrderStatus } from "@/types/orderTypes"; // Adjust the import path as necessary
import { format, isWithinInterval } from "date-fns";
import useAuth from "@/hooks/contexts/useAuth";
import "../../styles/invoice.css";
import { jsPDF } from "jspdf";
import { Bar } from "react-chartjs-2"; // Import Bar chart from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "processing" | "in-transit" | "delivered" | "canceled"
  >("all");
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await getAllOrdersRequest();
      setOrders(response.data.items || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: AdminOrder["status"]) => {
    const statusStyles: { [key in AdminOrder["status"]]: string } = {
      processing: "bg-blue-500 text-white",
      "in-transit": "bg-yellow-500 text-white",
      delivered: "bg-green-500 text-white",
      canceled: "bg-red-500 text-white",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[status]}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  const handleApproveOrder = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatusRequest(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error("Error approving order:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const withinDateRange =
      !startDate ||
      !endDate ||
      isWithinInterval(orderDate, { start: startDate, end: endDate });
    return (
      (filterStatus === "all" || order.status === filterStatus) &&
      withinDateRange
    );
  });

  const calculateTotalProfit = () => {
    return filteredOrders.filter((order) => order.status !== OrderStatus.CANCELLED).reduce((total, order) => {
      return (
        total +
        order.items.reduce((orderTotal, item) => {
          const profit =
            (item.discountedPrice - item.basePrice) * item.quantity; // Calculate profit for each item
          return orderTotal + profit; // Accumulate profit for the order
        }, 0)
      );
    }, 0);
  };
  const calculateTotalRevenue = () => {
    return filteredOrders.filter((order) => order.status !== OrderStatus.CANCELLED).reduce((total, order) => {
      return total + order.totalAmount;
    }, 0);
  };

  const totalProfit = calculateTotalProfit();
  const totalRevenue = calculateTotalRevenue();

  const calculateProfitByDay = () => {
    const profitByDay: { [key: string]: number } = {};

    filteredOrders.filter((order) => order.status !== OrderStatus.CANCELLED).forEach((order) => {
      const orderDate = format(new Date(order.createdAt), "yyyy-MM-dd"); // Format date to 'YYYY-MM-DD'
      const orderProfit = order.items.reduce((total, item) => {
        return total + (item.discountedPrice - item.basePrice) * item.quantity; // Calculate profit for each item
      }, 0);

      if (profitByDay[orderDate]) {
        profitByDay[orderDate] += orderProfit; // Accumulate profit for the day
      } else {
        profitByDay[orderDate] = orderProfit; // Initialize profit for the day
      }
    });

    return profitByDay;
  };

  const calculateRevenueByDay = () => {
    const revenueByDay: { [key: string]: number } = {};

    filteredOrders.filter((order) => order.status !== OrderStatus.CANCELLED).forEach((order) => {
      const orderDate = format(new Date(order.createdAt), "yyyy-MM-dd"); // Format date to 'YYYY-MM-DD'
      const orderRevenue = order.totalAmount;

      if (revenueByDay[orderDate]) {
        revenueByDay[orderDate] += orderRevenue; // Accumulate profit for the day
      } else {
        revenueByDay[orderDate] = orderRevenue; // Initialize profit for the day
      }
    });

    return revenueByDay;
  };

  const profitByDay = calculateProfitByDay();
  const revenueByDay = calculateRevenueByDay();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-gray-500 text-lg font-medium">
          Loading your orders...
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            No Orders Found
          </h2>
        </div>
      </div>
    );
  }

  const renderInvoice = (order: AdminOrder) => {
    if (!order) return null;
    return (
      <div className="invoice-box" id="invoice">
        <div className="header">
          <div className="logo">Perfume Point</div>
          <div className="invoice-title">INVOICE</div>
        </div>

        <div className="info-section">
          <div>
            <strong>Invoice Number:</strong> {order.invoiceNumber}
          </div>
          <div>
            <strong>Date:</strong> {format(new Date(), "dd/MM/yyyy")}
          </div>
        </div>

        <div className="info-section">
          <div>
            <strong>Bill To:</strong>
          </div>
          <div>
            {user?.firstName} {user?.lastName}
          </div>
          <div>{order.shippingAddress}</div>
          <div>
            <strong>Used Card:</strong> **** **** ****{" "}
            {order.cardLastFourDigits}
          </div>
          <div>
            <strong>Tax ID:</strong> {order.taxId || "N/A"}
          </div>
        </div>

        <table className="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Volume</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr>
                <td>{item.perfumeName}</td>
                <td>{item.volume}ml</td>
                <td>{item.quantity}</td>
                <td>${item.discountedPrice.toFixed(2)}</td>
                <td>${(item.discountedPrice * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <div>
            <strong>Subtotal:</strong> $
            {(order.totalAmount + order.discountAmount).toFixed(2)}
          </div>

          {order.discountAmount > 0 ? (
            <div>
              <strong>Campaign Discount:</strong> -$
              {order.discountAmount.toFixed(2)}
            </div>
          ) : (
            ""
          )}
          <div className="grand-total">
            <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
          </div>
        </div>

        <div className="footer">
          <p>Thank you for shopping with Perfume Point!</p>
          <p>For any questions, please contact support@perfumepoint.com</p>
        </div>
      </div>
    );
  };

  const handlePrintInvoice = () => {
    const invoice = document.getElementById("invoice");
    if (invoice) {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a0",
        putOnlyUsedFonts: true,
        floatPrecision: 16,
      });
      pdf.html(invoice, {
        callback: function (pdf: any) {
          pdf.save("invoice.pdf");
        },
      });
    }
  };

  const handleOpenInvoice = (order: AdminOrder) => {
    setSelectedOrder(order);
  };

  const handleCloseInvoice = () => {
    setSelectedOrder(null);
  };

  const renderProfitChart = () => {
    const chartData = {
      labels: Object.keys(profitByDay), // Dates
      datasets: [
        {
          label: "Total Profit by Day",
          data: Object.values(profitByDay), // Revenue values
          backgroundColor: Object.values(profitByDay).map((value) =>
            value < 0 ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)"
          ), // Color based on value
        },
      ],
    };

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Total Profit by Day
        </h2>
        <div className="p-16">
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  min:
                    Math.min(...Object.values(profitByDay)) < 0
                      ? Math.min(...Object.values(profitByDay)) - 10
                      : 0,
                  title: {
                    display: true,
                    text: "Profit ($)",
                  },
                },
              },
            }}
          />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Total Profit: ${totalProfit.toFixed(2)}
          </h2>
        </div>
      </div>
    );
  };

  const renderRevenueChart = () => {
    const chartData = {
      labels: Object.keys(revenueByDay), // Dates
      datasets: [
        {
          label: "Total Revenue by Day",
          data: Object.values(revenueByDay), // Revenue values
          backgroundColor: Object.values(revenueByDay).map((value) =>
            value < 0 ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)"
          ), // Color based on value
        },
      ],
    };

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Total Revenue by Day
        </h2>
        <div className="p-16">
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  min:
                    Math.min(...Object.values(revenueByDay)) < 0
                      ? Math.min(...Object.values(revenueByDay)) - 10
                      : 0,
                  title: {
                    display: true,
                    text: "Revenue ($)",
                  },
                },
              },
            }}
          />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Total Revenue: ${totalRevenue.toFixed(2)}
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1440px]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 ">Orders</h1>
        <div className="flex items-center gap-4">
          <div>
            <label className="mr-2">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border rounded p-2"
            >
              <option value="all">All</option>
              <option value="processing">Processing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="mr-2">Start Date:</label>
            <input
              type="date"
              onChange={(e) =>
                setStartDate(e.target.value ? new Date(e.target.value) : null)
              }
              className="border rounded p-2"
            />
            <label className="mr-2 ml-4">End Date:</label>
            <input
              type="date"
              onChange={(e) =>
                setEndDate(e.target.value ? new Date(e.target.value) : null)
              }
              className="border rounded p-2"
            />
          </div>
        </div>
      </div>

      {/* Total Revenue Chart */}
      {user?.role === "sales-manager" && (
        <div className="mb-8">
          {renderProfitChart()}
          {renderRevenueChart()}
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Order List</h2>

        {filteredOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Order Header */}
            <div className="border-b border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{order.orderId.slice(-8)}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
                </p>
                <p className="text-sm text-gray-500">User: {order.userName}</p>
                <p className="text-sm text-gray-500">
                  Shipping Address: {order.shippingAddress}
                </p>
              </div>
              {getStatusBadge(order.status)}
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.perfumeName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.volume}ml × {item.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-right">
                      ${(item.discountedPrice * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.discountedPrice.toFixed(2)}{" "}
                      {item.discountedPrice !== item.price && (
                        <span className="text-gray-500 line-through">
                          ${item.price.toFixed(2)}
                        </span>
                      )}{" "}
                      each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="p-6 bg-gray-50 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Total:{" "}
                <span className="font-semibold">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </p>
              {order.status === OrderStatus.PROCESSING &&
                user?.role === "product-manager" && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() =>
                      handleApproveOrder(order.orderId, OrderStatus.SHIPPED)
                    }
                  >
                    Approve
                  </button>
                )}
              {order.status === OrderStatus.SHIPPED &&
                user?.role === "product-manager" && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    onClick={() =>
                      handleApproveOrder(order.orderId, OrderStatus.DELIVERED)
                    }
                  >
                    Deliver
                  </button>
                )}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => handleOpenInvoice(order)}
              >
                See Invoice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Dialog */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={handleCloseInvoice}
              className="absolute top-2 right-2 text-gray-500"
            >
              &times;
            </button>
            {renderInvoice(selectedOrder)}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-center w-full"
              onClick={handlePrintInvoice}
            >
              Print as PDF
            </button>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-center w-full"
              onClick={handleCloseInvoice}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
