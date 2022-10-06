import Link from "next/link";
import HostCard from "../../components/HostCard";
import GuestCard from "../../components/GuestCard";
import Image from "next/image";
import RockPaperScissor from "../../components/RockPaperScissor";

export default function Game() {
  const room = {
    "id": 1,
    "roomName": "My Room",
    "roomCode": "AGJAA",
    "hostUserId": 1,
    "guestUserId": 2,
    "hostScore": 1,
    "guestScore": 2,
    "isFinished": false,
    "turn": 8,
    "hostSelection": 0,
    "guestSelection": 0,
    "createdAt": "2022-09-22T09:37:20.759Z",
    "updatedAt": "2022-09-22T09:37:20.759Z",
    "hostUserName": "Dimas",
    "guestUserName": "Ashidiqi",
  };

  return (
    <div className="bg-gray-100 h-screen w-full p-4 flex flex-col">
      {/* Back Button */}
      <div>
        <Link href="/game">
          Back
        </Link>
      </div>

      {/* Game Information */}
      <div className="flex mt-4 justify-between items-center">
        <HostCard
          hostUserName={room.hostUserName}
          hostScore={room.hostScore}
        />
        <div className="self-center text-center">
          <p className="text-xl">Round</p>
          <p className="text-5xl mt-1">{Math.floor((room.turn - 1) / 2) + 1}</p>
        </div>
        <GuestCard
          guestUserName={room.guestUserName}
          guestScore={room.guestScore}
        />
      </div>

      {/* Gameplay */}
      <div className="flex grow justify-between mt-8">
        <RockPaperScissor userSelection={room.hostSelection}/>
        <div className="flex flex-col justify-between h-full">
          <div />
          <p className="text-4xl text-slate-400 text-center">VS</p>
          <button className="bg-violet-600 hover:bg-violet-500 h-16 w-16 rounded-full">
            <Image src="/refresh.png" height={40} width={40} />
          </button>
        </div>
        <RockPaperScissor userSelection={room.guestSelection} />
      </div>

    </div>
  );
};
