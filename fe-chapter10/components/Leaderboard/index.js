import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import _axios from "../../helper/axios";
// import axios from "axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies(["accessToken"]);
  const authToken = cookies.accessToken;
  const getUsers = () => {
    _axios
      .get("/leaderboard", {
      // axios
      //   .get("https://service-games.herokuapp.com/leaderboard", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("err: " + err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <h1 className="font-bold uppercase px-2">Leaderboard 👑</h1>
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full shadow-md divide-y divide-gray-200">
                <thead className="bg-blue-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-semibold text-left text-white uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-semibold text-left text-white uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-sm font-semibold text-left text-white uppercase "
                    >
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-200">
                  {users.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
                        {data.fullname}
                      </td>
                      <td className="px-6 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
                        {/* sementara biar keliatan ada poinnya */}
                        {Math.floor(Math.random() * data.totalPoint)}
                        {/* {data.totalPoint} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}