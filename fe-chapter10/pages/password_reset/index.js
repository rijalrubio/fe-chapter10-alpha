import React, { useState, useEffect } from 'react';
import _axios from '../../helper/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { startResetting, stopResetting } from '../../share/redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function password_reset() {
  const [values, setValues] = useState({});
  const MySwal = withReactContent(Swal);
  const router = useRouter();
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
      .post('/email', {email:values.email, url:window.location.origin})
      .then((res) => {
        dispatch(stopResetting());
        router.push('/password_reset/sent');
      })
      .catch((err) => {
        dispatch(stopResetting());
        let message = '';
        debugger;
        if (err.response && err.response.data) {
          err.response.data.errors.forEach((element) => {
            message = message.concat(element.msg, ' ');
          });
        } else if(err.message) {
          message = err.message;
        }else {
          message = err.data;
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
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4">
              <span className="text-xl justify-center items-center flex font-bold text-gray-400 ">
                Reset your password
              </span>
            </div>
            <div className='px-6 py-4 bg-gray-800 text-gray-100'>
              Enter your user account's email address and we will send you a password reset link.
            </div>
            <div className="px-6 py-4 relative"><input
              className="shadow appearance-none border rounded-lg w-full py-2 pr-3 pl-9 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
              <span className="flex items-center absolute text-zinc-500 w-full h-full pointer-events-none pl-9 bottom-0 left-0">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <div className="px-6 py-4">
              <button style={{ display: !isResetting ? 'block' : 'none' }}
                className="w-full hover:bg-indigo-600 bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSubmit}
              >
                Send password reset email
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
          </form>
          <div className="px-6 py-4 flex justify-between">
            <div className="text-white items-start text-blue-400"><a href="/register">Register</a></div>
            <div className="text-white items-end text-blue-400"><a href="/login">Login</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default password_reset;
