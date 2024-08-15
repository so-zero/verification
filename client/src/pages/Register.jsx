import React, { useState } from "react";
import Input from "../components/Input";
import { UserRound, Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordForm from "../components/PasswordForm";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(name, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen max-w-lg mx-auto flex flex-col justify-center items-center">
      <div className="p-12 w-full border-t border-r border-l rounded-t-md">
        <h2 className="mb-6 text-xl font-bold text-center">회원가입</h2>
        <form onSubmit={handleRegister}>
          <Input
            icon={UserRound}
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {error && (
            <p className="text-sm text-red-500 font-semibold mt-2 ">{error}</p>
          )}
          <PasswordForm password={password} />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "회원가입"
            )}
          </button>
        </form>
      </div>
      <div className="px-8 py-4 w-full bg-gray-300 flex justify-center items-center gap-2 rounded-md">
        <p className="text-sm text-gray-800">이미 계정이 있으신가요?</p>
        <Link to="/login" className="text-base hover:underline transition">
          로그인
        </Link>
      </div>
    </div>
  );
};

export default Register;
