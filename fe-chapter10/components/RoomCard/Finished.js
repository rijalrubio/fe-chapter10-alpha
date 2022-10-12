import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import _axios from '../../helper/axios';

export default function Finished({ room, onClick }) {
  const [cookies] = useCookies(['accessToken', 'userId']);
  const isDraw = room.hostScore === room.guestScore;
  const [hostName, setHostName] = useState('');
  const [guestName, setGuestName] = useState('');
  const authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZnVsbG5hbWUiOiJSaWphbCBSdWJpIiwiZW1haWwiOiJyaWphbHJ1YmlvQGdtYWlsLmNvbSIsImlhdCI6MTY2NTI5NjExNSwiZXhwIjoxNjY1MzgyNTE1fQ.JtVGjxdDwN-dHaux9mkmzDDWGuWpSyxJgeCmZpQz2GE';

  const fetchRoomById = () => {
    _axios
      .get(`/game/${room.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        const response = res.data;
        setHostName(response.hostUserName);
        setGuestName(response.guestUserName);
      })
      .catch((err) => {
        console.log(err.data.message || err.data.msg);
      });
  };
  useEffect(() => {
    fetchRoomById();
  }, []);

  const isWin = room.hostScore > room.guestScore ? hostName : guestName;
  // (cookies.userId.id === room.guestScore && room.hostScore < room.guestScore ? guestName : '');
  return (
    <Link href={{ pathname: `/rooms/${room.id}` }}>
      <a>
        {isDraw ? (
          <div
            onClick={onClick}
            className="bg-slate-500 hover:bg-slate-400 px-8 pt-4 pb-8 rounded-lg cursor-pointer"
          >
            <div className="flex justify-between w-56 items-center">
              {room.roomCode}
            </div>
            <div className="flex justify-between w-56 items-center">
              <p className="font-semibold text-lg">{room.roomName}</p>
              <p className="text-slate-900 text-sm">Draw</p>
            </div>
            <p className="text-4xl text-center mt-4">
              {room.hostScore} - {room.guestScore}
            </p>
          </div>
        ) : (
          <>
            {isWin ? (
              <div
                onClick={onClick}
                className="bg-blue-900 hover:bg-blue-800 px-8 pt-4 pb-8 rounded-lg cursor-pointer"
              >
                <div className="flex justify-between w-56 items-center text-white">
                  {room.roomCode}
                </div>
                <div className="flex justify-between w-56 items-center">
                  <p className="font-bold text-white text-lg">
                    {room.roomName}
                  </p>
                  <p className="text-white font-semibold text-sm">
                    Winner: {isWin}
                  </p>
                </div>
                <p className="text-4xl text-center mt-4 text-yellow-600">
                  {room.hostScore} -{room.guestScore}
                </p>
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </a>
    </Link>
  );
}

{
  /* {isDraw ? (
          <div
            onClick={onClick}
            className="bg-slate-500 hover:bg-slate-400 px-8 pt-4 pb-8 rounded-lg cursor-pointer"
          >
            <div className="flex justify-between w-56 items-center">
              {room.roomCode}
            </div>
            <div className="flex justify-between w-56 items-center">
              <p className="font-semibold text-lg">{room.roomName}</p>
              <p className="text-slate-900 text-sm">Draw</p>
            </div>
            <p className="text-4xl text-center mt-4">
              {room.hostScore} - {room.guestScore}
            </p>
          </div>
        ) : (
          <>
            {isWin ? (
              <div
                onClick={onClick}
                className="bg-blue-900 hover:bg-blue-800 px-8 pt-4 pb-8 rounded-lg cursor-pointer"
              >
                <div className="flex justify-between w-56 items-center text-white">
                  {room.roomCode}
                </div>
                <div className="flex justify-between w-56 items-center">
                  <p className="font-bold text-white text-lg">
                    {room.roomName}
                  </p>
                  <p className="text-white font-semibold text-sm">
                    Winner: {isWin}
                  </p>
                </div>
                <p className="text-4xl text-center mt-4 text-yellow-600">
                  {room.hostScore} -{room.guestScore}
                </p>
              </div>
            ) : (
              ''
            )}
          </>
        )}
      </a>
    </Link> */
}
