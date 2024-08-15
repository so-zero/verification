import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto flex flex-col justify-center items-center">
      <div className="p-12 w-full border-t border-r border-l rounded-t-md">
        <h2 className="mb-6 text-xl font-bold text-center">비밀번호 재설정</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-center text-gray-600 mb-6">
              이메일 주소를 입력하시면 비밀번호를 재설정할 수 있는 메일을
              보내드립니다.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="mt-5 w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-600 transition duration-200">
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "메일 발송하기"
              )}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex justify-center items-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600 mt-6">
              곧 비밀번호 재설정 링크를 받게 됩니다.
            </p>
          </div>
        )}
      </div>
      <div className="px-8 py-4 w-full bg-gray-300 flex justify-center items-center gap-2 rounded-md">
        <Link
          to="/login"
          className="text-sm hover:underline transition flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> 로그인
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
