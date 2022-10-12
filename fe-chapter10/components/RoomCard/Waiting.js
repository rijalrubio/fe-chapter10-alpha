export default function Waiting({ room, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border border-black hover:bg-slate-100 px-8 pt-4 pb-8 rounded-lg cursor-pointer"
    >
      {/* <Link to={`/room/${room.id}`} state={room}> */}
      <div className="flex justify-between w-56 items-center">
        {room.roomCode}
      </div>
      <div className="flex justify-between w-56 items-center">
        <p className="font-semibold text-lg">{room.roomName}</p>
        <p className="text-slate-600 text-sm">Waiting..</p>
      </div>
      <p className="text-4xl text-center mt-4">
        {room.hostScore} - {room.guestScore}
      </p>
      {/* </Link> */}
    </div>
  );
}
