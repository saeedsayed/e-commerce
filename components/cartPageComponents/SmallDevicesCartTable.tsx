'use client'
import CartItem from './CartItem';
import { useCartContext } from '@/context/CartContext';

type Props = {}

const SmallDevicesCartTable = (props: Props) => {
    const { cart } = useCartContext();
  return (
    <div className='md:hidden mb-6'>
        <h3 className='pb-6 font-semibold border-b border-b-black'>Product</h3>
        {cart.map((item) => (
            <CartItem key={item.product._id} data={item} />
        ))}
    </div>
  )
}

export default SmallDevicesCartTable