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
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

export default function Game() {
  const shareURL = 'https://fe-chapter10-alpha.vercel.app/';
  const router = useRouter();
  const [cookies] = useCookies(["accessToken", "userId"]);
  const [room, setRoom] = useState();
  const authToken = cookies.accessToken;
  const user = cookies.userId;
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isShoResult, setIsShoResult] = useState(false);

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
        setIsShoResult(initialRoom.isTurnFinished);
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
            isHostWantReplay: null,
            isGuestWantReplay: null,
          },
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      ).then(async (res) => {
        const initialRoom = res.data;
        await setRoom(() => initialRoom);
        const _isMyTurn = (user.id === initialRoom.hostUserId && (initialRoom.turn - 1) % 2 === 0) ||
          (user.id === initialRoom.guestUserId && (initialRoom.turn - 1) % 2 === 1);
        await setIsMyTurn(_isMyTurn);
      });
  };

  const handleGuestSelection = async (guestSelection) => {
    let updatedRoom = { ...room };
    updatedRoom.guestSelection = guestSelection;
    updatedRoom.turn += 1;

    if (updatedRoom.hostSelection !== updatedRoom.guestSelection) {
      if (
        (updatedRoom.hostSelection === 1 && updatedRoom.guestSelection === 3) ||
        (updatedRoom.hostSelection === 2 && updatedRoom.guestSelection === 1) ||
        (updatedRoom.hostSelection === 3 && updatedRoom.guestSelection === 2)
      ) {
        updatedRoom.isHostWinRound = true;
        updatedRoom.hostScore += 1;
      } else {
        updatedRoom.isGuestWinRound = true;
        updatedRoom.guestScore += 1;
      }
    }
    updatedRoom.isTurnFinished = true;

    await setRoom(updatedRoom);
    await setIsMyTurn(
      (user.id === updatedRoom.hostUserId && (updatedRoom.turn - 1) % 2 === 0) ||
      (user.id === updatedRoom.guestUserId && (updatedRoom.turn - 1) % 2 === 1),
    );

    await _axios
      .put("/game/update", {
          roomId: updatedRoom.id,
          updatedValues: {
            guestSelection,
            turn: updatedRoom.turn,
            isHostWinRound: updatedRoom.isHostWinRound,
            hostScore: updatedRoom.hostScore,
            isGuestWinRound: updatedRoom.isGuestWinRound,
            guestScore: updatedRoom.guestScore,
            isTurnFinished: true,
          },
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      ).then(async (res) => {
        const initialRoom = res.data;
        await setRoom(() => initialRoom);
        const _isMyTurn = (user.id === initialRoom.hostUserId && (initialRoom.turn - 1) % 2 === 0) ||
          (user.id === initialRoom.guestUserId && (initialRoom.turn - 1) % 2 === 1);
        await setIsMyTurn(_isMyTurn);
        await setIsShoResult(true);
      });
  };

  const handleReplay = async () => {
    let updatedRoom = { ...room };
    let isRestart = false;
    console.log("full, ", room);
    console.log("sebelum, ", room.isHostWantReplay, room.isGuestWantReplay);

    if (user.id === updatedRoom.hostUserId) {
      updatedRoom.isHostWantReplay = true;
    } else {
      updatedRoom.isGuestWantReplay = true;
    }

    console.log("sesudah, ", (room.isHostWantReplay === true || updatedRoom.isHostWantReplay === true),
      (room.isGuestWantReplay === true || updatedRoom.isGuestWantReplay === true));
    if (
      (room.isHostWantReplay === true || updatedRoom.isHostWantReplay === true) &&
      (room.isGuestWantReplay === true || updatedRoom.isGuestWantReplay === true)
    ) {
      isRestart = true;
      console.log("game has restarted");
      updatedRoom.guestSelection = -1;
      updatedRoom.hostSelection = -2;
      updatedRoom.isHostWinRound = false;
      updatedRoom.isGuestWinRound = false;
      updatedRoom.isTurnFinished = false;
    } else if (
      ((user.id === updatedRoom.hostUserId && updatedRoom.isGuestWantReplay === null) ||
        (user.id === updatedRoom.guestUserId && updatedRoom.isHostWantReplay === null))
    ) {
      await Swal.fire({
        title: "Waiting for the other player",
        icon: "info",
        focusConfirm: false,
        confirmButtonColor: "#3b82f6",
      });
      setIsShoResult(false);
    }

    await setRoom(updatedRoom);

    await _axios
      .put("/game/update", {
          roomId: updatedRoom.id,
          updatedValues: {
            hostSelection: updatedRoom.hostSelection,
            guestSelection: updatedRoom.guestSelection,
            isHostWinRound: false,
            isGuestWinRound: false,
            isTurnFinished: updatedRoom.isTurnFinished,
            isHostWantReplay: updatedRoom.isHostWantReplay,
            isGuestWantReplay: updatedRoom.isGuestWantReplay,
          },
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      ).then(async (res) => {
        const initialRoom = res.data;
        await setRoom(() => initialRoom);
        const _isMyTurn = (user.id === initialRoom.hostUserId && (initialRoom.turn - 1) % 2 === 0) ||
          (user.id === initialRoom.guestUserId && (initialRoom.turn - 1) % 2 === 1);
        await setIsMyTurn(_isMyTurn);
      });
  };

  const handleRefresh = async () => {
    await fetchRoom(false);
  };

  const handleFinish = () => {
    _axios.put("/game/finish", {
        roomId: room.id,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    ).then((_) => {
      router.replace("/rooms");
    });
  };

  if (room) {
    return (
      <div className="bg-gray-100 h-[calc(100vh-64px)] w-ful pt-2 pb-4 px-8 flex flex-col">
        <div className="text-indigo-500 flex w-full justify-between items-center">
          <Link href="/rooms">Back</Link>
            {room.isFinished && (
              <div className="flex flex-row gap-x-4">
                <FacebookShareButton url={shareURL}>
                  <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <TwitterShareButton url={shareURL}>
                  <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton url={shareURL}>
                  <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
              </div>
            )}
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
            <p className="text-5xl mt-1">{room.isTurnFinished === true ? currentRound - 1 : currentRound}</p>
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
            {room.isFinished || (room.isTurnFinished && isShoResult) ? (
              <div
                className={`px-8 py-10 rounded-2xl text-center ${
                  room.guestSelection === room.hostSelection ? "bg-slate-300" : isUserWin ? "bg-green-200" : "bg-red-200"
                }`}
              >
                <p className="text-5xl">
                  {room.hostSelection === room.guestSelection ? "You Draw" : isUserWin ? "You Win" : "You Lose"}
                  <br />
                  This Round!
                </p>
                <div className="mt-8 flex flex-col gap-4 text-2xl">
                  <button
                    onClick={() => handleReplay()}
                    className="px-8 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                  >
                    Ask to Rematch
                  </button>
                  <button
                    onClick={handleFinish}
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
            <div className="flex items-center gap-x-4">
              <button
                className="bg-violet-600 hover:bg-violet-500 h-16 w-16 rounded-full"
                onClick={handleRefresh}
                disabled={!(user.id === room.hostUserId || user.id === room.guestUserId)}
              >
                <Image
                  src="/refresh.png"
                  height={40}
                  width={40}
                />
              </button>
            </div>
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
