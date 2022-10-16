export default function HostCard({ hostUserName, hostScore }) {
  return (
    <div className="p-4 flex items-center justify-between w-72 bg-violet-300 hover:bg-violet-400 rounded-lg">
      <div className="w-3/5 ">
        <p className="text-sm text-slate-700">Host</p>
        <p className="mt-1 text-2xl truncate">{hostUserName}</p>
      </div>
      <p className="w-1/5 text-5xl">{hostScore}</p>
    </div>
  );
}
