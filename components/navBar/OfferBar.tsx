import { axiosInstance } from "@/lib/axios";

const OfferBar = async () => {
  const {
    data: { data: OfferBarData },
  } = await axiosInstance<{ data: string }>("/home/newsbar");
  return (
    <div dangerouslySetInnerHTML={{__html:OfferBarData}} />
  );
};

export default OfferBar;
