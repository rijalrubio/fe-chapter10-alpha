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
  const [hasSelected, setHasSelected] = useState(false);
  const authToken = cookies.accessToken;
  const user = cookies.userId;
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isRoundFinished, setIsRoundFinished] = useState(false);

  const fetchRoom = async (isFirstTime) => {
    const { id } = router.query;
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
        if (initialRoom.hostUserId !== user.id && initialRoom.guestUserId === null) {
          if (isFirstTime) await handleGuestJoin(initialRoom.id);
          _isMyTurn = true;
        } else {
          _isMyTurn = (user.id === initialRoom.hostUserId && (initialRoom.turn - 1) % 2 === 0) ||
            (user.id === initialRoom.guestUserId && (initialRoom.turn - 1) % 2 === 1);
        }
        await setIsMyTurn(_isMyTurn);
        const _isRoundFinished = room && (room.isHostWinRound === true || room.isGuestWinRound === true);
        await setIsRoundFinished(_isRoundFinished);
        console.log(initialRoom); // TODO: Delete
      })
      .catch((e) => alert(e));
  };

  const checkLogin = async () => {
    if (authToken === undefined || authToken === "undefined") {
      await Swal.fire({
        title: "You Need To Login First",
        confirmButtonColor: "#3b82f6",
        icon: "error",
      });
      await router.replace("/login");
    } else {
      await fetchRoom(true);
    }
  };

  const handleGuestJoin = async (roomId) => {
    await _axios
      .put("/game/update", {
          roomId,
          updatedValues: {
            guestUserId: user.id,
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
    room && ((user.id === room.hostUserId && room.isHostWinRound) ||
      (user.id === room.guestUserId && room.isGuestWinRound));

  const handleHostSelection = async (hostSelection) => {
    let updatedRoom = { ...room };
    updatedRoom.hostSelection = hostSelection;
    updatedRoom.turn += 1;

    await setRoom(updatedRoom);
    await setIsMyTurn(
      (user.id === updatedRoom.hostUserId && (updatedRoom.turn - 1) % 2 === 0) ||
      (user.id === updatedRoom.guestUserId && (updatedRoom.turn - 1) % 2 === 1),
    );

    await _axios
      .put("/game/update", {
          roomId: updatedRoom.id,
          updatedValues: {
            hostSelection,
            turn: updatedRoom.turn,
          },
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      ).then(async (res) => {
        const initialRoom = res.data;
        console.log("Host has selected..");
        console.log(initialRoom);
        await setRoom(() => initialRoom);
        const _isMyTurn = (userId === initialRoom.hostUserId && (initialRoom.turn - 1) % 2 === 0) ||
          (userId === initialRoom.guestUserId && (initialRoom.turn - 1) % 2 === 1);
        await setIsMyTurn(_isMyTurn);
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

    await _axios
      .put("/game/update", {
          roomId: updatedRoom.id,
          updatedValues: {
            guestSelection,
            turn: updatedRoom.turn,
          },
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      ).then(async (res) => {
        const initialRoom = res.data;
        console.log("Guest has selected..");
        console.log(initialRoom);
        await setRoom(() => initialRoom);
        const _isMyTurn = (userId === initialRoom.hostUserId && (initialRoom.turn - 1) % 2 === 0) ||
          (userId === initialRoom.guestUserId && (initialRoom.turn - 1) % 2 === 1);
        await setIsMyTurn(_isMyTurn);
      });
  };

  const handleRefresh = async () => {
    console.log("Refreshing.."); // TODO delete
    await fetchRoom(false);
  };

  if (room) {
    return (
      <div className="bg-gray-100 h-[calc(100vh-64px)] w-full py-4 px-8 flex flex-col">
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
            isDisabled={room.guestUserId === null || user.id !== room.hostUserId || (room.hostUserId === user.id && isMyTurn === false)}
            isShowResult={room.hostUserId === user.id || room.isTurnFinished}
          />
          <div className="flex flex-col justify-between h-full items-center">
            <div />
            {room.isTurnFinished ? (
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
            isDisabled={user.id !== room.guestUserId || (room.guestUserId === user.id && isMyTurn === false)}
            isShowResult={room.guestUserId === user.id || room.isTurnFinished}
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
