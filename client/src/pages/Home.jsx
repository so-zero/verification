import React from "react";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto flex flex-col justify-center items-center">
      <div className="p-12 w-full border rounded-t-md text-center">
        <h2 className="mb-6 text-xl font-bold">프로필</h2>
        <div>
          <p className="text-gray-500 mb-2">이름: {user.name}</p>
          <p className="text-gray-500">이메일: {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 w-2/3 py-3 px-4 bg-black text-white rounded-md hover:bg-gray-600 transition duration-200"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Home;
