import React from "react";
import PaymentNumberArea from "./PaymentAccountsArea";
import PaymentInfoSubmitForm from "./PaymentInfoSubmitForm";
import TravelerCountArea from "./TravelerCountArea";

const PaymentForm: React.FC<{ availablePrice: number }> = ({
  availablePrice,
}) => {
  return (
    <div>
      <PaymentNumberArea />
      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <TravelerCountArea />
        <PaymentInfoSubmitForm availablePrice={availablePrice} />
      </div>
    </div>
  );
};

export default PaymentForm;
