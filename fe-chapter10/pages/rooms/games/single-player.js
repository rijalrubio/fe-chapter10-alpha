import Link from 'next/link';
import HostCard from '../../../components/HostCard';
import GuestCard from '../../../components/GuestCard';
import RockPaperScissor from '../../../components/RockPaperScissor';
import { useState } from 'react';

export default function SinglePlayer() {
  const userId = 1;
  const userName = 'Dimas';

  const initialRoom = {
    turn: 1,
    playerScore: 0,
    hostScore: 0,
    COMScore: 0,
    playerSelection: 0,
    COMSelection: 0,
    result: undefined,
  };

  const [room, setRoom] = useState(initialRoom);

  const handleHostSelection = async (playerSelection) => {
    let updatedRoom = { ...room };
    updatedRoom.playerSelection = playerSelection;
    const COMSelection = Math.floor(Math.random() * 3) + 1;
    updatedRoom.COMSelection = COMSelection;
    updatedRoom.turn += 1;

    if (playerSelection === COMSelection) {
      updatedRoom.result = 'draw';
    } else {
      if (
        (playerSelection === 1 && COMSelection === 3) ||
        (playerSelection === 2 && COMSelection === 1) ||
        (playerSelection === 3 && COMSelection === 2)
      ) {
        updatedRoom.result = 'win';
        updatedRoom.playerScore += 1;
      } else {
        updatedRoom.result = 'lose';
        updatedRoom.COMScore += 1;
      }
    }

    await setRoom(updatedRoom);
  };

  return (
    <div className="bg-gray-100 h-screen w-full py-4 px-8 flex flex-col">
      {/* Back Button */}
      <div className="text-violet-600">
        <Link href="/game">Back</Link>
      </div>

      {/* Game Information */}
      <div className="flex mt-4 justify-between items-center">
        <Link href={`/user/${room.hostUserId}`}>
          <div className="cursor-pointer">
            <HostCard hostUserName={userName} hostScore={room.playerScore} />
          </div>
        </Link>
        <div className="self-center text-center">
          <p className="text-xl">Round</p>
          <p className="text-5xl mt-1">{room.turn}</p>
        </div>
        <Link href={`/user/${room.guestUserId}`}>
          <div className="cursor-pointer">
            <GuestCard guestUserName="COM" guestScore={room.COMScore} />
          </div>
        </Link>
      </div>

      {/* Gameplay */}
      <div className="flex grow justify-between mt-8">
        <RockPaperScissor
          userSelection={room.playerSelection}
          onSelect={handleHostSelection}
          isDisabled={false}
        />
        <div className="flex flex-col justify-between h-full items-center">
          <div />
          {room.result !== undefined ? (
            <div
              className={`px-8 py-10 rounded-2xl text-center ${
                room.result === 'win'
                  ? 'bg-green-200'
                  : room.result === 'draw'
                  ? 'bg-gray-200'
                  : 'bg-red-200'
              }`}
            >
              <p className="text-5xl">
                {room.result === 'win'
                  ? 'You Win'
                  : room.result === 'draw'
                  ? 'Draw'
                  : 'You Lose'}
              </p>
              {/*<div className="mt-8 flex flex-col gap-4 text-2xl">*/}
              {/*  /!*<button*!/*/}
              {/*  /!*  onClick={() => console.log("Restart clicked")}*!/*/}
              {/*  /!*  className="px-8 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"*!/*/}
              {/*  /!*>*!/*/}
              {/*  /!*  Play Again*!/*/}
              {/*  /!*</button>*!/*/}
              {/*  /!*<button*!/*/}
              {/*  /!*  onClick={() => console.log("Finish clicked")}*!/*/}
              {/*  /!*  className="px-8 py-2 border border-2 border-violet-600 rounded-lg text-violet-600 hover:bg-white transition"*!/*/}
              {/*  /!*>*!/*/}
              {/*  /!*  Finish*!/*/}
              {/*  /!*</button>*!/*/}
              {/*</div>*/}
            </div>
          ) : (
            <p className="text-4xl text-slate-500 text-center">Your Turn</p>
          )}
          <div />
        </div>
        <RockPaperScissor
          userSelection={room.COMSelection}
          isDisabled={true} // TODO: Delete
        />
      </div>
    </div>
  );
}
