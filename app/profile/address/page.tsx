import { AddressCard, PagesTitle } from "@/components/profilePageComponents";
import CreateAddress from "@/components/profilePageComponents/addressesComponents/CreateAddress";
import { axiosInstance } from "@/lib/axios";
import { IAddress } from "@/types";
import { FaPlus } from "react-icons/fa6";

const Address = async () => {
  const {
    data: { data: address },
  } = await axiosInstance<{ data: IAddress[] }>("addresses");
  return (
    <div>
      <PagesTitle>Address</PagesTitle>
      <div className="grid gap-3 grid-cols-12">
        {address.map((item) => (
          <div
            key={item._id}
            className="md:col-span-6 xl:col-span-4 col-span-full"
          >
            <AddressCard address={item} />
          </div>
        ))}
          <div
        
            className="md:col-span-6 xl:col-span-4 col-span-full"
          >
     
        <CreateAddress/>
          </div>
      </div>
    </div>
  );
};

export default Address;
