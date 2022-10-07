import { useRouter } from 'next/router'
import React, { useState } from "react";
import _axios from "../../helper/axios";

const Register = () => {

    const [values, setValues] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        _axios
          .post("/user/register", values, {headers: {
            'Access-Control-Allow-Origin': true,
          }})
          .then((res) => {
            router.push(`/login`);
          })
          .catch((err) => err);
    };

    const togglePasswordVisibility = () => {
        if (showPassword == true) {
            setShowPassword(false)
          } else {
            setShowPassword(true)
          }
    }

    return (  
        <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="flex flex-col justify-center w-full h-max rounded-lg border-2 max-w-md px-6 py-6 bg-white">
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                    Register
                    </h2>
                </div>
                <form className="mt-4 space-y-6" action="#" method="POST">
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
                            onClick={handleSubmit}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register 