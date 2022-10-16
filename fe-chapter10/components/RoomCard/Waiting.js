import Link from 'next/link';

export default function Waiting({ room, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-slate-200 hover:bg-slate-300 px-8 pt-4 pb-8 rounded-lg cursor-pointer"
    >
      <Link href={{ pathname: `/rooms/games/${room.id}` }}>
        <a>
          <div className="flex justify-between w-56 items-center">
            {room.roomCode}
          </div>
          <div className="flex justify-between w-56 items-center pt-2">
            <p className="font-semibold text-lg leading-normal">
              {room.roomName}
            </p>
            <p className="text-slate-600 text-sm leading-normal font-semibold">
              Waiting..
            </p>
          </div>
          <p className="text-4xl text-center mt-4">
            {room.hostScore} - {room.guestScore}
          </p>
        </a>
      </Link>
    </div>
  );
}
