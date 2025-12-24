import React from "react";
import {
  PagesTitle,
  OrdersTable,
  OrderTableForSmallDevices,
} from "@/components/profilePageComponents";
import { Order } from "@/types/order";
import Link from "next/link";

const Orders = async () => {
  // const [err, orders]: [string | null, Order[]] = await getData(
  //   'orders',
  //   ['products.product.thumbnail'],
  //   [{ field: '[account]', operator: 'eq', value: session?.user?.id }]
  // )
  return (
    <div>
      <PagesTitle>Orders History</PagesTitle>
      {/* {orders.length === 0 &&
       <p className="text-center py-3 text-sm md:text-base">
        You don't hav any orders! <Link href={'/shop'} className="text-badge font-bold">create one now -&gt;</Link></p>}
      {orders.length > 0 && <p>You have <span className="text-badge font-bold">{orders.length}</span> orders</p>}
      <OrdersTable data={orders} />
      <OrderTableForSmallDevices data={orders} /> */}
    </div>
  );
};

export default Orders;