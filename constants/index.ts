import { LiaShippingFastSolid } from "react-icons/lia";
import { FaInstagram, FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn, CiLock, CiPhone } from "react-icons/ci";
import { MdOutlineLocalPhone, MdOutlineMailOutline } from "react-icons/md";
import { IconType } from "react-icons";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

export const MAIN_NAV_LINKS: {
  name: string;
  path: string;
}[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Contact Us",
    path: "/contact",
  },
];

export const PROFILE_LINKS: {
  name: string;
  path: string;
}[] = [
  {
    name: "Account",
    path: "/profile",
  },
  {
    name: "Address",
    path: "/profile/address",
  },
  {
    name: "Orders",
    path: "/profile/orders",
  },
  {
    name: "Wishlist",
    path: "/profile/wishlist",
  },
];

export const SOCIAL_LINKS: {
  name: string;
  path: string;
  icon: IconType;
}[] = [
  {
    name: "Facebook",
    path: "https://www.facebook.com/",
    icon: RiFacebookCircleLine,
  },
  {
    name: "XTwitter",
    path: "https://x.com/",
    icon: FaXTwitter,
  },
  {
    name: "Instagram",
    path: "https://www.instagram.com/",
    icon: FaInstagram,
  },
];

export const OUR_FEATURES: {
  title: string;
  description: string;
  icon: IconType;
}[] = [
  {
    title: "Free Shipping",
    description: "Free shipping on Order above $200",
    icon: LiaShippingFastSolid,
  },
  {
    title: "Money-back",
    description: "30 days guarantee",
    icon: FaRegMoneyBillAlt,
  },
  {
    title: "Secure Payment",
    description: "100% secure payment by Stripe",
    icon: CiLock,
  },
  {
    title: "24/7 Support",
    description: "Support online 24 hours a day",
    icon: MdOutlineLocalPhone,
  },
];
export const CONTACT_INFO = [
  {
    title: "address",
    description: "234 Hai Trieu, Ho Chi Minh City, Viet Nam",
    icon: CiLocationOn,
  },
  {
    title: "Contact Us",
    description: "+0123456789",
    icon: CiPhone,
  },
  {
    title: "Email",
    description: "hello@E-shop.com",
    icon: MdOutlineMailOutline,
  },
];
export const CHECKOUT_STEPS = [
  {
    name: "Shopping cart",
    path: "/cart",
    step: 1,
  },
  {
    name: "Checkout details",
    path: "/cart/checkout",
    step: 2,
  },
  {
    name: "Order Complete",
    path: "/cart/checkout/complete",
    step: 3,
  },
];

export const SHIPPING_METHODS = [
  {
    id: 1,
    name: "Free Shipping",
    value: "free",
    cost: "$0.00",
  },
  {
    id: 2,
    name: "Express Shipping",
    value: "express",
    cost: "+$15.00",
  },
  {
    id: 3,
    name: "Pick Up",
    value: "local",
    cost: "%21.00",
  },
];
