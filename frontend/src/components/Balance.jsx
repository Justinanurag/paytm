export const Balance = ({ value }) => {
  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl shadow-md">
      <div className="text-lg font-semibold">Your Balance</div>
      <div className="text-2xl font-bold">₹ {value}</div>
    </div>
  );
};
