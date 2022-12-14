import { RoomCard } from '../../components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import _axios from '../../helper/axios';

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const [cookies] = useCookies(['accessToken', 'userId']);
  const authToken = cookies.accessToken;
  const MySwal = withReactContent(Swal);

  const fetchRooms = () => {
    _axios
      .get('/room/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        const _rooms = res.data;
        setRooms(_rooms);
      })
      .catch((e) => alert(e));
  };

  const checkLogin = async () => {
    if (authToken === 'undefined') {
      await MySwal.fire({
        title: 'You Need To Login First',
        confirmButtonColor: '#3b82f6',
        icon: 'error',
      });
      router.replace('/');
    } else {
      await fetchRooms();
    }
  };

  useEffect(() => {
    (async () => {
      await checkLogin(); // TODO
    })();
  }, []);

  const handleCreate = async () => {
    const { value: roomName } = await MySwal.fire({
      title: 'How Should We Call Your Room?',
      confirmButtonColor: '#3b82f6',
      input: 'text',
      inputLabel: 'Your Room Name',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });

    _axios
      .post(
        '/room/create',
        { roomName },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then(() => {
        fetchRooms();
      })
      .catch((e) => console.log(e));
  };

  const handleJoin = async () => {
    const { value: roomCode } = await MySwal.fire({
      title: 'What is the Room Code?',
      confirmButtonColor: '#3b82f6',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        } else {
          _axios
            .get(`/room/join/${value}`, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            })
            .then((res) => {
              const response = res.data;
              console.log(res);
              const _roomId = response.room.id;
              const room = response.room;
              router.replace(`/rooms/games/${_roomId}`);
            })
            .catch((e) => {
              alert(e);
            });
        }
      },
    });
  };

  const handleClick = async (e, room) => {
    if (cookies.userId.id !== room.hostUserId) {
      await MySwal.fire({
        title: 'Are you sure to join this room?',
        confirmButtonColor: '#3b82f6',
        showCancelButton: true,
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
        closeOnConfirm: true,
        closeOnCancel: true,
      })
        .then((result) => {
          if (result.value) {
            _axios
              .get(`/room/join/${room.roomCode}`, {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              })
              .then((res) => {
                const response = res.data;
                const _roomId = response.room.id;
                const room = response.room;
                router.replace(`/rooms/games/${_roomId}`);
              })
              .catch((e) => {
                alert(e);
              });
          } else if (result.dismiss == 'cancel') {
            console.log('cancel');
          } else if (result.dismiss == 'esc') {
            console.log('cancle-esc**strong text**');
          }
        })
        .catch(function () {
          e.preventDefault();
        });
    } else {
      router.replace(`/rooms/games/${room.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="xl:container mx-auto">
        <div className="pt-4 px-4">
          <button
            className="py-2 w-[144px] rounded-lg mr-4 transition-colors bg-indigo-500 text-white hover:bg-indigo-700"
            onClick={handleJoin}
          >
            Join Game
          </button>
          <button
            className="py-2 w-[144px] rounded-lg transition-colors border border-indigo-500 text-indigo-500 hover:bg-gray-200"
            onClick={handleCreate}
          >
            Create Room
          </button>
        </div>
        <div className="mt-8 flex flex-wrap xl:gap-4 lg:gap-3 md:gap-2 px-4">
          {rooms.map(function (room, i) {
            if (!room.guestUserId) {
              return (
                <RoomCard.Waiting
                  room={rooms[i]}
                  onClick={(e) => handleClick(e, rooms[i])}
                  key={rooms[i].id}
                />
              );
            } else if (room.isFinished === true) {
              return (
                <RoomCard.Finished
                  room={rooms[i]}
                  // onClick={() => handleClick(rooms[i].id)}
                  key={rooms[i].id}
                />
              );
            }
            return (
              <RoomCard.OnGoing
                room={rooms[i]}
                // onClick={() => handleClick(rooms[i].id)}
                key={rooms[i].id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
