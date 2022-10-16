import { useCookies } from 'react-cookie';
import Link from 'next/link';

export default function OnGoing({ room, onClick }) {
  const [cookies] = useCookies(['userId']);
  const isMyTurn =
    (room.hostUserId === cookies.userId.id && (room.turn - 1) % 2 === 0) ||
    (room.guestUserId === cookies.userId.id && (room.turn - 1) % 2 === 1);
  const isRoomFull =
    room.hostUserId &&
    room.guestUserId &&
    (room.hostUserId !== cookies.userId.id &&
      room.guestUserId !== cookies.userId.id);

  if (isRoomFull) {
    return (
      <div
        className={
          'bg-slate-500 hover:bg-slate-400 px-8 pt-4 pb-8 rounded-lg cursor-pointer'
        }
        onClick={onClick}
      >
        <div className="flex justify-between w-56 items-center text-white">
          {room.roomCode}
        </div>
        <div className="flex justify-between w-56 items-center pt-2">
          <p className="font-semibold text-lg leading-normal text-white">
            {room.roomName}
          </p>
          <p className="text-white text-sm leading-normal font-semibold">
            Room Full
          </p>
        </div>
        <p className="text-4xl text-center mt-4">
          {room.hostScore} - {room.guestScore}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-blue-100 hover:bg-blue-200 border px-8 pt-4 pb-8 rounded-lg cursor-pointer ${
        isMyTurn ? 'border-blue-700' : ''
      }`}
      onClick={onClick}
    >
      {/* <Link href={`/rooms/${room.id}`} state={room}> */}
      <Link href={`/rooms/games/${room.id}`}>
        <a>
          <div className="flex justify-between w-56 items-center">
            {room.roomCode}
          </div>
          <div className="flex justify-between w-56 items-center pt-2">
            <p className="font-semibold text-lg leading-normal">
              {room.roomName}
            </p>
            <p className="text-slate-600 text-sm leading-normal font-semibold">
              {isMyTurn ? 'Your Turn' : 'Enemy Turn'}
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
