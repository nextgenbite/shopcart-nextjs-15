"use client";


import { TableBody, TableCell, TableRow } from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
// import { format } from "date-fns";
import { X } from "lucide-react";
import { use, useEffect, useState } from "react";
// import OrderDetailDialog from "./OrderDetailDialog";
import toast from "react-hot-toast";
import PriceFormatter from "../landing/PriceFormatter";
import { Order } from "@/types/active_ecommerce_json";
const Orders = ({ orders }: { orders: Order[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // useEffect(() => {
  //   if (user) {
      
  //     fetchOrdersByUser(user?.id).then((data) => {
  //       console.log("Fetched orders in Orders component:", data);
  //     }).catch((error) => {  console.error("Error fetching orders in Orders component:", error);
  //     });
  //   }

  // }, [orders]);
  const handleDelete = () => {
    toast.error("Delete method applied for Admin");
  };
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order?.id}>
              <TooltipTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100 h-12"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="font-medium">
                    {order.id?.slice(-10) ?? "N/A"}...
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.user.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={Number(order.total)}

                      className="text-black font-medium"
                    />
                  </TableCell>
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.paymentstatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order?.status.charAt(0).toUpperCase() +
                          order?.status.slice(1)}
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    {order?.id && (
                      <p className="font-medium line-clamp-1">
                        {order?.id ?? "----"}
                      </p>
                    )}
                  </TableCell>
                  <TableCell
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete();
                    }}
                    className="flex items-center justify-center group"
                  >
                    <X
                      size={20}
                      className="group-hover:text-shop_dark_green hoverEffect"
                    />
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      {/* <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      /> */}
    </>
  );
};

export default Orders;