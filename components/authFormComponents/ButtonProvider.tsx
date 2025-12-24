import React from "react";
import { Button } from "../common";
import { BsGoogle } from "react-icons/bs";

type Props = {
  provider: "google";
};

const ButtonProvider = ({ provider }: Props) => {
  return (
    <Button
      type="submit"
      className="flex items-center gap-4 w-full justify-center"
    >
      <BsGoogle /> continuo with {provider}
    </Button>
  );
};

export default ButtonProvider;
