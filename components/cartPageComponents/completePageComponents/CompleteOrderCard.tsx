// 'use client'
// import { Button, Spinner } from '@/components/common'
// import { useAuthContext } from '@/context/AuthContext'
// import { useCartContext } from '@/context/CartContext'
// import { Order } from '@/types/order'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { BsCart } from 'react-icons/bs'
// import { FaArrowRight } from 'react-icons/fa6'

// const CompleteOrderCard = () => {
//     const router = useRouter()
//     const { cart, totalCartPrice, cartStatus } = useCartContext()
//     const { user } = useAuthContext()
//     const param = useSearchParams().get("client_id")
//     const [loading, setLoading] = useState<boolean>(true)
//     const [orderDetail, setOrderDetail] = useState<Order>()
//     const orderListOfProductsId = cart.map(({ quantity, product }) => ({ product: product._id, quantity }))
//     useEffect(() => {
//         if (cartStatus === 'done' && !!totalCartPrice?.total) {
//             // create order
//             (async () => {
//                 setLoading(true)
//                 // get buyer info and shipping method from local storage
//                 const buyerInfo = JSON.parse(localStorage.getItem('buyerInfo') as string)
//                 const shippingMethod = localStorage.getItem('shipping_method') as string
//                 try {
//                     // create order and make cart empty
//                     const [err, orderData] = await createOrder(
//                         buyerInfo,
//                         shippingMethod,
//                         totalCartPrice?.total as number,
//                         user?._id as string,
//                         orderListOfProductsId
//                     )
//                     if (err) throw new Error(err)
//                     // await makeCartEmpty()
//                     localStorage.removeItem('client_secret')
//                     localStorage.removeItem('buyerInfo')
//                     localStorage.removeItem('shipping_method')
//                     setOrderDetail(orderData)
//                 } catch (err) {
//                     console.log(err)
//                 } finally {
//                     setLoading(false)
//                 }
//             })()
//         }
//     }, [cartStatus, totalCartPrice])

//     useEffect(() => {
//         // get previous url
//         const previousURL = document.referrer
//         // get client secret from local storage
//         const clientSecret = localStorage.getItem('client_secret')
//         // check if previous url is checkout
//         if (!previousURL.includes('cart/checkout')) {
//             window.history.back()
//             return
//         }
//         // check if client secret is equal to param
//         if (clientSecret !== param) router.push('/shop')
//     }, [])
//     return (
//         <div className='bg-white rounded-lg shadow-md py-14 flex flex-col items-center justify-center'>
//             {loading ? <Spinner /> : <>
//                 <h3 className='text-2xl text-[#6C7275]'>Thank you! 🎉</h3>
//                 <h2 className='mt-4 mb-10 text-4xl font-semibold'>Your order has been received</h2>
//                 <div className='flex gap-8 flex-wrap'>
//                     {orderDetail?.attributes.products.map((product) => (
//                         <Link href={"/shop/" + product.product.data.id} className='bg-primary p-4 relative' key={product.id}><Image src={product.product.data.attributes.thumbnail.data.attributes.url}
//                             alt={product.product.data.attributes.name}
//                             width={100} height={100} /> <span className='absolute -top-4 -right-4 bg-black aspect-square w-8 rounded-full text-white flex items-center justify-center'>{product.count}</span></Link>
//                     ))}
//                 </div>
//                 <ul className='flex flex-col gap-5 mt-10'>
//                     <li className='flex justify-between items-center gap-8'>
//                         <p className='text-sm font-semibold text-[#6C7275]'>Order code</p>
//                         <p className='text-sm text-black font-semibold'>{orderDetail?.id}</p>
//                     </li>
//                     <li className='flex justify-between items-center gap-8'>
//                         <p className='text-sm font-semibold text-[#6C7275]'>Date</p>
//                         <p className='text-sm text-black font-semibold'>
//                             {/* convert date from ISO string to human readable */}
//                             {new Date(orderDetail?.attributes?.createdAt as string)
//                                 .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                         </p>
//                     </li>
//                     <li className='flex justify-between items-center gap-8'>
//                         <p className='text-sm font-semibold text-[#6C7275]'>Total</p>
//                         <p className='text-sm text-black font-semibold'>${orderDetail?.attributes.total}</p>
//                     </li>
//                     <li className='flex justify-between items-center gap-8'>
//                         <p className='text-sm font-semibold text-[#6C7275]'>Shipping</p>
//                         <p className='text-sm text-black font-semibold'>{orderDetail?.attributes.shipping}</p>
//                     </li>
//                 </ul>
//                 <Link href={'/shop'}>
//                     <Button className='mt-10 flex items-center gap-2'>continue shopping <FaArrowRight /></Button>
//                 </Link>
//             </>}
//         </div>
//     )
// }

// export default CompleteOrderCard
import React from 'react'

type Props = {}

export default function CompleteOrderCard({}: Props) {
  return (
    <div>CompleteOrderCard</div>
  )
}