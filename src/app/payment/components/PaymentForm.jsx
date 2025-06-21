import React from 'react'

const PaymentForm = () => {
  return (
    <form className="w-full text-white max-w-2xl bg-black bg-opacity-50 p-8 rounded-r-lg shadow-lg">
    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-2">Billing frequency</h2>
      <div className="flex gap-3">
        <button className="px-4 py-2 border border-[#52A3D5] rounded-lg text-sm">Pay monthly<br /><span className="font-semibold">PKR 1000/month</span></button>
        <button className="px-4 py-2 border border-[#52A3D5] rounded-lg text-sm">
          Pay yearly<br />
          <span className="font-semibold">PKR 2000/month</span>
        </button>
      </div>
    </div>

    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Payment method</h2>
      <div className="flex gap-4 flex-wrap font-semibold">
        <button className="px-4 py-2 border rounded-lg">Credit or Debit card</button>
        <button className="px-4 py-2 border rounded-lg">Easypaisa</button>
        <button className="px-4 py-2 border rounded-lg">Jazz Cash</button>
        <button className="px-4 py-2 border rounded-lg">Bank Transfer</button>
      </div>
    </div>

    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Payment information</h2>
      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Card number"
          className="border px-4 py-2 rounded-lg w-full "
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            className="border px-4 py-2 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="CVC"
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Name on card"
          className="border px-4 py-2 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Street address or P.O box"
          className="border px-4 py-2 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Apt., suite, unit, building (Optional)"
          className="border px-4 py-2 rounded-lg w-full"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City"
            className="border px-4 py-2 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="State, province, region"
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        <select className="border px-4 py-2 rounded-lg w-full">
          <option value="">Select country</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Belgium">Belgium</option>
          <option value="Canada">Canada</option>
          <option value="Denmark">Denmark</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="Iceland">Iceland</option>
          <option value="Ireland">Ireland</option>
          <option value="Italy">Italy</option>
          <option value="Japan">Japan</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Netherlands">Netherlands</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Norway">Norway</option>
          <option value="Singapore">Singapore</option>
          <option value="South Korea">South Korea</option>
          <option value="Spain">Spain</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
        </select>
      </div>
    </div>

    <button className="bg-[#52A3D5] text-white px-6 py-3 rounded-lg w-full hover:bg-[#4288b3] transition">
      Subscribe
    </button>
  </form>
  )
}

export default PaymentForm