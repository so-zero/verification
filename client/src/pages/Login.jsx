import React, { useState } from "react";
import Input from "../components/Input";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto flex flex-col justify-center items-center">
      <div className="p-12 w-full border-t border-r border-l rounded-t-md">
        <h2 className="mb-6 text-xl font-bold text-center">로그인</h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center mb-1">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:underline transition"
            >
              비밀번호 찾기
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "로그인"
            )}
          </button>
        </form>
      </div>
      <div className="px-8 py-4 w-full bg-gray-300 flex justify-center items-center gap-2 rounded-md">
        <p className="text-sm text-gray-800">계정이 없으신가요?</p>
        <Link to="/register" className="text-base hover:underline transition">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
