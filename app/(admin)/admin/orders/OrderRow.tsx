"use client";

import { useState } from "react";
import { formatKES } from "@/lib/utils";
import { OrderStatusForm } from "./OrderStatusForm";

type OrderItem = { product_name: string; quantity: number; unit_price: string };

type Order = {
  id: number;
  order_number: string;
  status: string;
  payment_status: string;
  total: string;
  delivery_address: string | null;
  notes: string | null;
  customers: { name: string; phone: string } | null;
  order_items: OrderItem[];
};

export function OrderRow({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 text-left"
      >
        <div className="min-w-0">
          <p className="font-medium">
            {order.order_number} <span className="text-neutral-400 font-normal">{open ? "▾" : "▸"}</span>
          </p>
          <p className="text-sm text-neutral-500 truncate">
            {order.customers?.name} - {order.customers?.phone}
          </p>
          <p className="text-sm text-neutral-500">
            {formatKES(order.total)} - payment: {order.payment_status}
          </p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <OrderStatusForm orderId={order.id} currentStatus={order.status} />
        </div>
      </button>

      {open && (
        <div className="border-t bg-neutral-50 p-4 text-sm">
          <p className="font-medium mb-2">Items</p>
          <div className="space-y-1 mb-3">
            {order.order_items.map((item, i) => (
              <div key={i} className="flex justify-between text-neutral-700">
                <span>
                  {item.quantity} x {item.product_name}
                </span>
                <span>{formatKES(parseFloat(item.unit_price) * item.quantity)}</span>
              </div>
            ))}
            {order.order_items.length === 0 && <p className="text-neutral-400">No items recorded.</p>}
          </div>
          {order.delivery_address && (
            <p className="text-neutral-600">
              <span className="font-medium">Delivery address: </span>
              {order.delivery_address}
            </p>
          )}
          {order.notes && (
            <p className="text-neutral-600 mt-1">
              <span className="font-medium">Notes: </span>
              {order.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
