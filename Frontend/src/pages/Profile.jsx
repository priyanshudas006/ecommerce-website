import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import Titel from "../components/Titel";

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(backendUrl + "/api/user/profile", {
          headers: { token },
        });
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [backendUrl, token]);

  if (loading) return <div className="mt-20 text-center">Loading...</div>;

  if (!token)
    return (
      <div className="mt-20 text-center text-gray-600">Please login to view your profile.</div>
    );

  return (
    <div className="mt-2">
      <div className="text-2xl text-center pt-8 border-t">
        <Titel text1={"MY"} text2={"PROFILE"} />
      </div>

      <div className="max-w-3xl m-auto mt-8 p-6 border border-gray-2 rounded text-gray-700">
        <div className="mb-4">
          <b className="text-gray-800">Name:</b>
          <p>{user?.name}</p>
        </div>

        <div className="mb-4">
          <b className="text-gray-800">Email:</b>
          <p>{user?.email}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 bg-black text-white">Edit Profile</button>
          <a href="/orders" className="px-4 py-2 border border-gray-300">View Orders</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
