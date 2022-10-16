import React, { useEffect } from 'react';
import _axios from '../../helper/axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

function sent() {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [useRouter, isLoggedIn]);

  return (
    <div className="bg-gray-100">
      <div className="flex h-screen justify-center items-center">
        <div className="w-80 rounded-lg overflow-hidden shadow-2xl m-4 bg-gray-800">
          <div className="px-6 py-4">
            <span className="text-xl justify-center items-center flex font-bold text-gray-400 ">
            Reset your password
            </span>
          </div>
          <div className='px-6 py-4 bg-gray-800 text-gray-100'>
          Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
          </div>
          
          <div className="px-6 py-4 flex justify-between">
            <div className="text-white items-start text-blue-400"><a href="/register">Register</a></div>
            <div className="text-white items-end text-blue-400"><a href="/login">Login</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sent;
