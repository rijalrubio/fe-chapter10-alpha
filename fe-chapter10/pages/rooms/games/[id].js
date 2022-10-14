import Link from 'next/link';
import HostCard from '../../../components/HostCard';
import GuestCard from '../../../components/GuestCard';
import Image from 'next/image';
import RockPaperScissor from '../../../components/RockPaperScissor';
import { useEffect, useState } from 'react';

export default function Game() {
  const userId = 1;

  const initialRoom = {
    id: 1,
    roomName: 'My Room',
    roomCode: 'AGJAA',
    hostUserId: 1,
    guestUserId: 2,
    hostScore: 0,
    guestScore: 0,
    isFinished: false,
    turn: 1,
    hostSelection: 0,
    guestSelection: 0,
    isHostWantReplay: undefined, //
    isGuestWantReplay: undefined, //
    isHostWinRound: true, //
    isGuestWinRound: false, //
    createdAt: '2022-09-22T09:37:20.759Z',
    updatedAt: '2022-09-22T09:37:20.759Z',
    hostUserName: 'Dimas',
    guestUserName: 'Ashidiqi',
  };

  const [room, setRoom] = useState(initialRoom);
  const [isMyTurn, setIsMyTurn] = useState(
    (userId === room.hostUserId && (room.turn - 1) % 2 === 0) ||
      (userId === room.guestUserId && (room.turn - 1) % 2 === 1)
  );

  const currentRound = Math.floor((room.turn - 1) / 2) + 1;
  const isUserWin =
    (userId === room.hostUserId && room.isHostWinRound) ||
    (userId === room.guestUserId && room.isGuestWinRound);
  const isRoundFinished = room.isHostWinRound === true || room.isGuestWinRound;

  const handleHostSelection = async (hostSelection) => {
    let updatedRoom = { ...room };
    updatedRoom.hostSelection = hostSelection;
    updatedRoom.turn += 1;

    await setRoom(updatedRoom);
    await setIsMyTurn(
      (userId === updatedRoom.hostUserId && (updatedRoom.turn - 1) % 2 === 0) ||
        (userId === updatedRoom.guestUserId && (updatedRoom.turn - 1) % 2 === 1)
    );
    console.log(room.turn);
  };

  const handleGuestSelection = async (guestSelection) => {
    let updatedRoom = { ...room };
    updatedRoom.guestSelection = guestSelection;
    updatedRoom.turn += 1;

    await setRoom(updatedRoom);
    await setIsMyTurn(
      (userId === updatedRoom.hostUserId && (updatedRoom.turn - 1) % 2 === 0) ||
        (userId === updatedRoom.guestUserId && (updatedRoom.turn - 1) % 2 === 1)
    );
    console.log(updatedRoom.turn);
  };

  const handleRefresh = () => {
    console.log('Refreshing..'); // TODO
  };

  return (
    <div className="bg-gray-100 h-screen w-full py-4 px-8 flex flex-col">
      {/* Back Button */}
      <div className="text-indigo-500">
        <Link href="/rooms">Back</Link>
      </div>

      {/* Game Information */}
      <div className="flex mt-4 justify-between items-center">
        <Link href={`/user/${room.hostUserId}`}>
          <div className="cursor-pointer">
            <HostCard
              hostUserName={room.hostUserName}
              hostScore={room.hostScore}
            />
          </div>
        </Link>
        <div className="self-center text-center">
          <p className="text-xl">Round</p>
          <p className="text-5xl mt-1">{currentRound}</p>
        </div>
        <Link href={`/user/${room.guestUserId}`}>
          <div className="cursor-pointer">
            <GuestCard
              guestUserName={room.guestUserName}
              guestScore={room.guestScore}
            />
          </div>
        </Link>
      </div>

      {/* Gameplay */}
      <div className="flex grow justify-between mt-8">
        <RockPaperScissor
          userSelection={room.hostSelection}
          onSelect={handleHostSelection}
          // isDisabled={userId !== room.hostUserId && isMyTurn === false}
          isDisabled={isMyTurn === false} // TODO: Delete
        />
        <div className="flex flex-col justify-between h-full items-center">
          <div />
          {isRoundFinished ? (
            <div
              className={`px-8 py-10 rounded-2xl text-center ${
                isUserWin ? 'bg-green-200' : 'bg-red-200'
              }`}
            >
              <p className="text-5xl">
                {isUserWin ? 'You Win' : 'You Lose'}
                <br />
                This Round!
              </p>
              <div className="mt-8 flex flex-col gap-4 text-2xl">
                <button
                  onClick={() => console.log('Restart clicked')}
                  className="px-8 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                >
                  Ask to Rematch
                </button>
                <button
                  onClick={() => console.log('Finish clicked')}
                  className="px-8 py-2 border-2 border-violet-600 rounded-lg text-violet-600 hover:bg-white transition"
                >
                  Finish
                </button>
              </div>
            </div>
          ) : (
            <p className="text-4xl text-slate-500 text-center">
              {isMyTurn ? 'Your' : "Enemy's"} Turn
            </p>
          )}
          <button
            className="bg-violet-600 hover:bg-violet-500 h-16 w-16 rounded-full"
            onClick={handleRefresh}
          >
            <Image src="/refresh.png" height={40} width={40} />
          </button>
        </div>
        <RockPaperScissor
          userSelection={room.guestSelection}
          onSelect={handleGuestSelection}
          // isDisabled={userId !== room.guestUserId}
          isDisabled={false} // TODO: Delete
        />
      </div>
    </div>
  );
}
