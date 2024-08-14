import React from "react";
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    {
      label: "비밀번호는 최소 6자 이상을 권장합니다.",
      met: password.length >= 6,
    },
    { label: "대문자 포함을 권장합니다.", met: /[A-Z]/.test(password) },
    { label: "소문자 포함을 권장합니다.", met: /[a-z]/.test(password) },
    { label: "숫자 포함을 권장합니다.", met: /\d/.test(password) },
    {
      label: "특수문자 포함을 권장합니다.",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span className={item.met ? "text-green-500 " : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordForm = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getStrengthText = (strength) => {
    if (strength === 0) return "매우약함";
    if (strength === 1) return "약함";
    if (strength === 2) return "보통";
    if (strength === 3) return "강함";
    return "매우강함";
  };

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">비밀번호 강도</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordForm;
