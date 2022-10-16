import React, { useState, useEffect } from 'react';
import _axios from '../../helper/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { startResetting, stopResetting } from '../../share/redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

function reset() {
  const router = useRouter(); 
  const [values, setValues] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const { isLoggedIn, isResetting } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [useRouter, isLoggedIn]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startResetting());
    _axios
      .post('/user/resetpassword', values, {
        headers: {
          'Access-Control-Allow-Origin': true,
          Authorization: `Bearer ${router.query.token}`,
        }})
      .then((res) => {
          dispatch(stopResetting());
          router.push('/password_reset/success');
      })
      .catch((err) => {
        dispatch(stopResetting());
        let message = '';
        if (err.response && err.response.data) {
          err.response.data.errors.forEach((element) => {
            message = message.concat(element.msg, ' ');
          });
        } else if(err.message){
          message = err.message;
        }else{
          message = err.data.message;
        }

        MySwal.fire({
          title: <p>{message}</p>,
          icon: 'error',
        });
      });
  };

  return (
    <div className="bg-gray-100">
      <div className="flex h-screen justify-center items-center">
        <div className="w-80 rounded-lg overflow-hidden shadow-2xl m-4 bg-gray-800">
          <div className="px-6 py-4">
            <span className="text-xl justify-center items-center flex font-bold text-gray-400 ">
            Enter your new password
            </span>
          </div>
          <div className="px-6 pt-4 mb-4">
            <div className="flex justify-between">
              <div className="relative w-full">
                <input
                      className="shadow appearance-none border rounded-lg w-full py-2 px-9 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
                      name="password"
                      type={!showPassword ? 'password' : 'text'}
                      placeholder="New Password"
                      onChange={handleChange}
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
          <div className="px-6 pt-4 mb-4">
            <div className="flex justify-between">
              <div className="relative w-full">
                <input
                      className="shadow appearance-none border rounded-lg w-full py-2 px-9 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
                      name="confirmpassword"
                      type={!showPassword ? 'password' : 'text'}
                      placeholder="Confirm Password"
                      onChange={handleChange}
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
            <button style={{ display: !isResetting ? 'block' : 'none' }}
              className="w-full hover:bg-indigo-600 bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Reset password
            </button>
            <button
              style={{
                display: isResetting ? 'flex' : 'none',
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
          <div className="px-6 py-4 flex justify-between">
            <div className="text-white items-start text-blue-400"><a href="/register">Register</a></div>
            <div className="text-white items-end text-blue-400"><a href="/password_reset">Forgot password?</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default reset;
