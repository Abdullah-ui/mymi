import React from "react";
import PaymentForm from "./components/PaymentForm";
import PlanSummary from "./components/PlanSummary";

const page = () => {
  return (
    <div className="flex max-md:flex-col items-center h-screen ">
      <PlanSummary />
      <PaymentForm />
    </div>
  );
};

export default page;
