import Link from "next/link";
import HostCard from "../../../components/HostCard";
import GuestCard from "../../../components/GuestCard";
import Image from "next/image";
import RockPaperScissor from "../../../components/RockPaperScissor";
import {useEffect, useState} from "react";
import _axios from "../../../helper/axios";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import Swal from "sweetalert2";

export default function Game() {
  const router = useRouter();
  const [cookies] = useCookies(["accessToken", "userId"]);
  const [room, setRoom] = useState();
  const [hasSelected, setHasSelected] = useState(false)
  const authToken = cookies.accessToken;
  const user = cookies.userId;
  let userId;
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isRoundFinished, setIsRoundFinished] = useState(false);

  const fetchRoom = async (isFirstTime) => {
    const { id } = router.query;
    userId = user.id;
    await _axios
      .get(`/game/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(async (res) => {
        const initialRoom = res.data;
        await setRoom(() => initialRoom);
        let _isMyTurn;
        if (initialRoom.hostUserId !== userId && initialRoom.guestUserId === null) {
          if (isFirstTime) await handleGuestJoin();
          _isMyTurn = true
        } else {
          _isMyTurn = (userId === initialRoom.hostUserId && (initialRoom.turn - 1) % 2 === 0) ||
            (userId === initialRoom.guestUserId && (initialRoom.turn - 1) % 2 === 1);
        }
        await setIsMyTurn(_isMyTurn);
        const _isRoundFinished = room && (room.isHostWinRound === true || room.isGuestWinRound === true);
        await setIsRoundFinished(_isRoundFinished)
        console.log(initialRoom); // TODO: Delete
      })
      .catch((e) => alert(e));
  };

  const checkLogin = async () => {
    if (authToken === undefined || authToken === 'undefined') {
      await Swal.fire({
        title: 'You Need To Login First',
        confirmButtonColor: '#3b82f6',
        icon: 'error',
      });
      await router.replace('/login');
    } else {
      await fetchRoom(true);
    }
  };

  const handleGuestJoin = async (roomId) => {
    await _axios
      .put("/game/update", {
          roomId,
          updatedValues: {
            guestUserId: userId,
          },
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
  };

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        await checkLogin();
      }
    })();
  }, [router.isReady]);

  // const initialRoom = {
  //   id: 1,
  //   roomName: 'My Room',
  //   roomCode: 'AGJAA',
  //   hostUserId: 1,
  //   guestUserId: 2,
  //   hostScore: 0,
  //   guestScore: 0,
  //   isFinished: false,
  //   turn: 1,
  //   hostSelection: 0,
  //   guestSelection: 0,
  //   isHostWantReplay: undefined, //
  //   isGuestWantReplay: undefined, //
  //   isHostWinRound: true, //
  //   isGuestWinRound: false, //
  //   createdAt: '2022-09-22T09:37:20.759Z',
  //   updatedAt: '2022-09-22T09:37:20.759Z',
  //   hostUserName: 'Dimas',
  //   guestUserName: 'Ashidiqi',
  // };
  //

  const currentRound = room ? Math.floor((room.turn - 1) / 2) + 1 : 0;
  const isUserWin =
    room && ((userId === room.hostUserId && room.isHostWinRound) ||
      (userId === room.guestUserId && room.isGuestWinRound));

  const handleHostSelection = async (hostSelection) => {
    let updatedRoom = { ...room };
    updatedRoom.hostSelection = hostSelection;
    updatedRoom.turn += 1;

    await setRoom(updatedRoom);
    await setIsMyTurn(
      (userId === updatedRoom.hostUserId && (updatedRoom.turn - 1) % 2 === 0) ||
      (userId === updatedRoom.guestUserId && (updatedRoom.turn - 1) % 2 === 1),
    );

    console.log(updatedRoom.id);
    await _axios
      .put("/game/update", {
          roomId: updatedRoom.id,
          updatedValues: {
            hostScore: 0,
          },
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      ).then((res) => {
        console.log(res);
      });
  };

  const handleGuestSelection = async (guestSelection) => {
    let updatedRoom = { ...room };
    updatedRoom.guestSelection = guestSelection;
    updatedRoom.turn += 1;

    await setRoom(updatedRoom);
    await setIsMyTurn(
      (userId === updatedRoom.hostUserId && (updatedRoom.turn - 1) % 2 === 0) ||
      (userId === updatedRoom.guestUserId && (updatedRoom.turn - 1) % 2 === 1),
    );
  };

  const handleRefresh = async () => {
    console.log("Refreshing.."); // TODO delete
    await fetchRoom(false)
  };

  if (room) {
    return (
      <div className="bg-gray-100 h-screen w-full py-4 px-8 flex flex-col">
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
            isDisabled={room.guestUserId === null || (userId !== room.hostUserId && isMyTurn === false)}
            // isDisabled={isMyTurn === false} // TODO: Delete
          />
          <div className="flex flex-col justify-between h-full items-center">
            <div />
            {isRoundFinished && ((userId === room.guestUserId && hasSelected) || true) ? (
              <div
                className={`px-8 py-10 rounded-2xl text-center ${
                  isUserWin ? "bg-green-200" : "bg-red-200"
                }`}
              >
                <p className="text-5xl">
                  {isUserWin ? "You Win" : "You Lose"}
                  <br />
                  This Round!
                </p>
                <div className="mt-8 flex flex-col gap-4 text-2xl">
                  <button
                    onClick={() => console.log("Restart clicked")}
                    className="px-8 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                  >
                    Ask to Rematch
                  </button>
                  <button
                    onClick={() => console.log("Finish clicked")}
                    className="px-8 py-2 border-2 border-violet-600 rounded-lg text-violet-600 hover:bg-white transition"
                  >
                    Finish
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-4xl text-slate-500 text-center">
                {room.guestUserId === null ? "Waiting.." : isMyTurn ? "Your Turn" : "Enemy's Turn"}
              </p>
            )}
            <button
              className="bg-violet-600 hover:bg-violet-500 h-16 w-16 rounded-full"
              onClick={handleRefresh}
            >
              <Image
                src="/refresh.png"
                height={40}
                width={40}
              />
            </button>
          </div>
          <RockPaperScissor
            userSelection={room.guestSelection}
            onSelect={handleGuestSelection}
            isDisabled={userId !== room.guestUserId}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-4xl">Loading..</p>
      </div>
    );
  }
}
