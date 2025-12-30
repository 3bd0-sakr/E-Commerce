import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { OrderItem } from "@/interfaces/order";

export default function OrderItemsDropdown({ order }: { order: OrderItem[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button"
          className="cursor-pointer px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition text-sm font-medium">
          View Order Items
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 mx-auto">
        <DropdownMenuLabel>
          Order Items
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {order.map((order) => (
          <DropdownMenuItem
            key={order._id}
            className="flex item-center gap-3 py-2 cursor-default"
          >
            <Image
              src={order.product.imageCover}
              alt={order.product.title}
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded"
            />

            <div className="flex-1">
              <div className="font-medium">
                {order.product.title}
              </div>
              <div className="text-xs text-gray-500">
                Qty: {order.count} | Price:{" "}
                {order.price} EGP
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu >
  );
}