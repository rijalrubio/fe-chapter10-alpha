export default function GuestCard({guestUserName, guestScore}) {
  return (
    <div className="p-4 flex items-center justify-between w-72 bg-blue-300 rounded-lg">
      <p className="w-1/5 text-5xl text-end">{guestScore}</p>
      <div className="w-3/5 text-end">
        <p className="text-sm text-slate-700">Guest</p>
        <p className="mt-1 text-2xl truncate">{guestUserName}</p>
      </div>
    </div>
  );
};