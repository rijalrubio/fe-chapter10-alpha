import React, { useEffect } from 'react';
import _axios from '../../helper/axios';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
function success() {
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
          
          <div className='px-6 py-4 bg-gray-800 text-gray-100 text-center'>
          Password is successfully changed. Please navigate to login page.
          </div>
          
          <div className="px-6 py-4 text-center">
            <div className="text-white items-end text-blue-400"><a href="/login">Login</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default success;
