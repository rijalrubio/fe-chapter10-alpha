import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import _axios from '../../helper/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faFileText,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setRegister,
  startRegistration,
  stopRegistration,
} from '../../share/redux/registerSlice';

const Profile = () => {
  const MySwal = withReactContent(Swal);
  const [values, setValues] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['accessToken', 'userId']);
  const router = useRouter();
  const { isRegistering } = useSelector((state) => state.register);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsLoading(true)
    _axios
      .get(`/user`, {
        headers: {
          'Access-Control-Allow-Origin': true,
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        setIsLoading(false)
        setValues(res.data);
      })
      .catch((err) =>
        MySwal.fire({
          title: <p>{err.data.message || err.data.msg}</p>,
          icon: 'error',
        })
      );
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startRegistration());
    _axios
      .put('/user', values, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        MySwal.fire({
          title: <p>Changes saved successfully!</p>,
          icon: 'success',
        });
        dispatch(setRegister());
        router.push(`/`);
      })
      .catch((err) => {
        MySwal.fire({
          title: <p>{err.data.message || err.data.msg}</p>,
          icon: 'error',
        });
        dispatch(stopRegistration());
      });
  };

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="mb-5 p-8 border-2 rounded-full bg-transparent border-gray-800">
          <svg
            width="100"
            height="100"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <title>user-outline</title>
            <path d="M320,310.18V277.27A128,128,0,0,0,384,166.4V128a128,128,0,0,0-256,0v38.4a128,128,0,0,0,64,110.87v32.91A172.84,172.84,0,0,0,51.2,480a32,32,0,0,0,32,32H428.8a32,32,0,0,0,32-32A172.84,172.84,0,0,0,320,310.18ZM153.6,166.4V128a102.4,102.4,0,1,1,204.8,0v38.4a102.4,102.4,0,1,1-204.8,0ZM256,294.4a127.94,127.94,0,0,0,38.4-5.86v29.77l-38.4,23-38.4-23V288.54A127.94,127.94,0,0,0,256,294.4Zm172.8,192H83.2a6.41,6.41,0,0,1-6.4-6.4c0-71.72,51.56-131.61,119.56-144.58L256,371.2l59.64-35.78c68,13,119.56,72.86,119.56,144.58A6.41,6.41,0,0,1,428.8,486.4Z" />
          </svg>
        </div>
        <div className="w-80 rounded-lg overflow-hidden shadow-2xl m-4 bg-gray-800">
          <div className="px-6 py-4">
            <span className="text-xl justify-center items-center flex font-bold text-gray-400">
              Profile
            </span>
          </div>
          <form onSubmit={onSubmit}>
            <div className="px-6 py-4 relative">
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 pr-3 pl-9 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
                name="fullname"
                type="fullname"
                placeholder="Fullname"
                value={isLoading ? 'loading...' : values.fullname}
                onChange={handleOnChange}
              />
              <span className="flex items-center absolute text-zinc-500 w-full h-full pointer-events-none pl-9 bottom-0 left-0">
                <FontAwesomeIcon icon={faFileText} />
              </span>
            </div>
            <div className="px-6 py-4 relative">
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 pr-3 pl-9 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                placeholder="Email"
                value={isLoading ? 'loading...' : values.email}
                onChange={handleOnChange}
              />
              <span className="flex items-center absolute text-zinc-500 w-full h-full pointer-events-none pl-9 bottom-0 left-0">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <div className="px-6 pt-4 mb-4">
              <div className="flex justify-between">
                <div className="relative w-full">
                  <input
                    className="shadow appearance-none border rounded-lg w-full py-2 px-9 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
                    name="password"
                    type={!showPassword ? 'password' : 'text'}
                    placeholder="*********"
                    onChange={handleOnChange}
                  />
                  <span className="flex items-center absolute text-zinc-500 w-full h-full pointer-events-none pl-3 bottom-0 left-0">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <label
                    className="absolute inset-y-2 right-0 pr-2 text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <svg
                        className="fill-current h-6 w-6 text-zinc-500"
                        viewBox="0 0 640 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="fill-current h-6 w-6 text-zinc-500"
                        viewBox="0 0 640 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        ></path>
                      </svg>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <button
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                style={{
                  display: !isRegistering ? 'block' : 'none',
                }}
              >
                Save Changes
              </button> 
              <button
                  style={{
                    display: isRegistering ? 'flex' : 'none',
                  }}
                  type="submit"
                  className="w-full hover:bg-indigo-600 bg-indigo-500 text-white font-bold px-4 py-2 leading-6  rounded focus:outline-none focus:shadow-outline"
                  disabled
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
