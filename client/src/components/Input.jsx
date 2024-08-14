const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-gray-600" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-3 rounded-md border focus:outline-none focus:border-gray-600 focus:ring-gray-600 text-black placeholder:text-gray-600 transition duration-200"
      />
    </div>
  );
};

export default Input;
