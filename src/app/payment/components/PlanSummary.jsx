import React from "react";

const PlanSummary = () => {
  return (
    <div className="w-full max-w-md p-8 bg-gradient-to-br from-[#52A3D5] to-[#03102B] text-white rounded-l-lg shadow-lg !h-[774.65px]">
      <button className="mb-6 text-white opacity-70 hover:opacity-100 text-base flex items-center gap-1">
        ← Upgrade your plan
      </button>

      <h1 className="text-4xl font-bold mb-2">1000 pkr</h1>
      <p className="mb-6 text-sm opacity-90">We will bill you 1000 pkr monthly + taxes, unless you cancel.</p>

      <div className="bg-black bg-opacity-50 text-white rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-white text-black rounded-full p-2 w-6 h-6 flex items-center justify-center text-xs font-semibold">S</div>
          <div>
            <p className="font-semibold">Standard pro</p>
            <p className="text-sm text-neutal-400">Up to 5 users in Figma. Great for small teams, agencies and startups.</p>
          </div>
          <div className="ml-auto font-semibold text-nowrap">1000 pkr</div>
        </div>
        <button className="w-full mt-2 border border-black rounded-md py-2 text-sm text-neutal-300 hover:bg-black transition">
          Add promo code
        </button>
      </div>

      <div className="text-sm opacity-90 mb-1">Subtotal</div>
      <div className="text-lg font-semibold mb-4">1000 pkr</div>

      <div className="text-lg font-semibold">Total due today</div>
      <div className="text-3xl font-bold">1000 pkr</div>
    </div>
  );
};

export default PlanSummary;
