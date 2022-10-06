import Link from "next/link";
import HostCard from "../../components/HostCard";
import GuestCard from "../../components/GuestCard";

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
    "turn": 1,
    "hostSelection": 0,
    "guestSelection": 0,
    "createdAt": "2022-09-22T09:37:20.759Z",
    "updatedAt": "2022-09-22T09:37:20.759Z",
    "hostUserName": "Dimas",
    "guestUserName": "Ashidiqi",
  };

  return (
    <div className="bg-gray-100 h-screen w-full p-4">
      {/* Back Button */}
      <div>
        <Link href="/game">
          Back
        </Link>
      </div>

      <div className="flex mt-4 justify-between items-center">
        <HostCard hostUserName={room.hostUserName} hostScore={room.hostScore}/>
        <p className="text-2xl text-slate-400">VS</p>
        <GuestCard guestUserName={room.guestUserName} guestScore={room.guestScore}/>
      </div>

      <div>
      {/* Host */}
        <div>
          <button>
            <Image></Image>
          </button>
        </div>
      </div>

    </div>
  );
};
