import { useCookies } from 'react-cookie';
import Link from 'next/link';

export default function OnGoing({ room, onClick }) {
  const [cookies] = useCookies(['userId']);
  const userId = '3';
  const isMyTurn =
    (room.hostUserId === userId && room.turn % 2 === 1) ||
    (room.guestUserId === userId && room.turn % 2 === 0);
  // const isMyTurn =
  //   (room.hostUserId === cookies.userId.id && room.turn % 2 === 1) ||
  //   (room.guestUserId === cookies.userId.id && room.turn % 2 === 0);

  return (
    <div
      className={`bg-blue-100 hover:bg-blue-200 border px-8 pt-4 pb-8 rounded-lg cursor-pointer ${
        isMyTurn ? 'border-blue-700' : ''
      }`}
      onClick={onClick}
    >
      {/* <Link href={`/rooms/${room.id}`} state={room}> */}
      <Link href={`/rooms/${room.id}`}>
        <a>
          <div className="flex justify-between w-56 items-center">
            {room.roomCode}
          </div>
          <div className="flex justify-between w-56 items-center">
            <p className="font-semibold text-lg">{room.roomName}</p>
            <p className="text-slate-600 text-sm">
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
