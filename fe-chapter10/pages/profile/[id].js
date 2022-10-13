import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import _axios from "../../helper/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const Profile = () => {
    const MySwal = withReactContent(Swal);
    const [values, setValues] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJQb3R0ZXIiLCJlbWFpbCI6InBvdHRlckBnbWFpbC5jb20iLCJpYXQiOjE2NjUzODg1MTUsImV4cCI6MTY2NTQ3NDkxNX0.wgmNJKxgwBtaevBnrv1An56g8V7JJMAVz0ydcB4feI0"
    const router = useRouter();
    // const { id } = router.query;

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      _axios
          .get(`/user`, {headers: {
            // 'Access-Control-Allow-Origin': true,
            Authorization: `Bearer ${token}`,
          }})
          .then((res) => {
            setValues(res.data)
            console.log(res.data)
          })
          .catch((err) => 
          // MySwal.fire({
          //   title: <p>{err.data.msg || err.data.msg}</p>,
          //   icon: "error",
          // })
          console.log(err)
          )
    }, [])

    const onSubmit = (e) => {
      e.preventDefault();
      _axios
        .put("/user", values, {headers: {
          // 'Access-Control-Allow-Origin': true,
          Authorization: `Bearer ${token}`,
        }})
        .then((res) => {
          router.push(`/login`);
        })
        .catch((err) => 
        // MySwal.fire({
        //   title: <p>{err.data.msg || err.data.msg}</p>,
        //   icon: "error",
        // })
        console.log(err)
        )
  };

    const togglePasswordVisibility = () => {
        if (showPassword == true) {
            setShowPassword(false)
          } else {
            setShowPassword(true)
          }
    }

    return (  
        <div className="flex flex-col h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="mb-5 p-8 border-2 rounded-full bg-white">
              <svg width="100" height="100" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>user-outline</title><path d="M320,310.18V277.27A128,128,0,0,0,384,166.4V128a128,128,0,0,0-256,0v38.4a128,128,0,0,0,64,110.87v32.91A172.84,172.84,0,0,0,51.2,480a32,32,0,0,0,32,32H428.8a32,32,0,0,0,32-32A172.84,172.84,0,0,0,320,310.18ZM153.6,166.4V128a102.4,102.4,0,1,1,204.8,0v38.4a102.4,102.4,0,1,1-204.8,0ZM256,294.4a127.94,127.94,0,0,0,38.4-5.86v29.77l-38.4,23-38.4-23V288.54A127.94,127.94,0,0,0,256,294.4Zm172.8,192H83.2a6.41,6.41,0,0,1-6.4-6.4c0-71.72,51.56-131.61,119.56-144.58L256,371.2l59.64-35.78c68,13,119.56,72.86,119.56,144.58A6.41,6.41,0,0,1,428.8,486.4Z"/></svg>
            </div>
            <div className="flex flex-col justify-center w-full h-max rounded-lg border-2 max-w-md px-6 py-6 bg-white">
                <form className="space-y-2" action="#" method="POST" onSubmit={onSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px">
                        <div>
                            <label htmlFor="fullname" className="">
                            Fullname
                            </label>
                            <input
                            id="fullname"
                            name="fullname"
                            type="fullname"
                            autoComplete="fullname"
                            required
                            className="relative block w-full appearance-none rounded-md border-2 border-gray-300 px-3 mb-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                            placeholder="ex: John Doe"
                            value={values.fullname}
                            onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="">
                            Email
                            </label>
                            <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-md border-2 border-gray-300 px-3 mb-4 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                            placeholder="ex: johndoe@gmail.com"
                            value={values.email}
                            onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="">
                            Password
                            </label>
                            <input
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            className="relative block w-full appearance-none rounded-md border-2 border-gray-300 mb-4 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm"
                            type={showPassword ? "text" : "password"}
                            placeholder="ex: Pass123!"
                            onChange={handleOnChange}
                            />
                            <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" onClick={togglePasswordVisibility} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Show Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-24">
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 mt-6 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile 