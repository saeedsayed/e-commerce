import { PagesTitle } from "@/components/profilePageComponents";
import { AccountDetailsForm } from "@/components/profilePageComponents";

const AccountDetails = async () => {
  return (
    <div>
      <PagesTitle>Account Details</PagesTitle>
      <AccountDetailsForm />
    </div>
  );
};

export default AccountDetails;
