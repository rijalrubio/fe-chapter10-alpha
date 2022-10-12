import { RoomCard } from '../../components';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import _axios from '../../helper/axios';

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const [cookies] = useCookies(['accessToken', 'userId']);
  // const authToken = cookies.accessToken;
  const authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZnVsbG5hbWUiOiJSaWphbCBSdWJpIiwiZW1haWwiOiJyaWphbHJ1YmlvQGdtYWlsLmNvbSIsImlhdCI6MTY2NTI5NjExNSwiZXhwIjoxNjY1MzgyNTE1fQ.JtVGjxdDwN-dHaux9mkmzDDWGuWpSyxJgeCmZpQz2GE';

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
      await Swal.fire({
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
    const { value: roomName } = await Swal.fire({
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
        '/rooms/create',
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
      .catch((e) => alert(e));
  };

  const handleJoin = async () => {
    const { value: roomCode } = await Swal.fire({
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
            .get(`/rooms/join/${roomCode}`, {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            })
            .then((res) => {
              const response = res.data;
              const _roomId = response.room.id;
              const room = response.room;
              router.replace(`/rooms/${_roomId}`);
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
      await Swal.fire({
        title: 'Are you sure to join this room?',
        confirmButtonColor: '#3b82f6',
        showCancelButton: true,
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
        closeOnConfirm: true,
        closeOnCancel: true,
      })
        .then((result) => {
          if (result.dismiss !== 'cancel') {
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
                router.replace(`/room/${_roomId}`);
              })
              .catch((e) => {
                alert(e);
              });
          } else {
            console.log('cancel');
          }
        })
        .catch(function () {
          e.preventDefault();
        });
    } else {
      router.replace(`/rooms/${room.id}`);
      // navigate(`/rooms/${room.id}`, { state: room });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:container mx-auto px-8 ">
        <div className="mt-4">
          <button
            className="py-2 w-[144px] rounded-lg mr-4 transition-colors bg-blue-500 text-white hover:bg-blue-700"
            onClick={handleJoin}
          >
            Join Game
          </button>
          <button
            className="py-2 w-[144px] rounded-lg transition-colors border border-blue-500 text-blue-500 hover:bg-gray-200"
            onClick={handleCreate}
          >
            Create Room
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-8">
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
