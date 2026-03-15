import { CompleteOrderCard } from "@/components/cartPageComponents";

const page = async  ({ searchParams }: { searchParams: { order_id: string } }) => {
  const { order_id } = await searchParams;
  return <CompleteOrderCard orderId={order_id} />;
};

export default page;
