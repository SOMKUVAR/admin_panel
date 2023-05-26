import React, { useState } from "react";
import { emailContains, login } from "../api";
import { Input } from "../component/Form/FormElement";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    const isEmail = await emailContains({username});
    if (isEmail === false) {
      setUsernameError("Email is not valid");
      return;
    }
    setUsernameError("");
    const loginInfo = await login({ username, password });
    if (loginInfo.length === 0) {
      setPasswordError("password is not valid");
      return;
    }
    if(loginInfo.length > 0){
    localStorage.setItem("admin_login",true);
    localStorage.setItem("admin",JSON.stringify(loginInfo[0]));
    window.location.href = `/`;
    }
  };

  return (
    <div className="flex justify-center md:p-20">
      <div className="bg-white shadow-md rounded px-10 pt-10 pb-10 mb-4 w-full md:w-96">
        <h3 className="block text-gray-700 text-sm font-bold mb-6 text-center">
          LOGIN
        </h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <div className="text-red-500 ml-1 text-sm">{usernameError}</div>
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="text-red-500 ml-1 text-sm">{passwordError}</div>
          </div>
          <div className="w-full">
            <button
              className="bg-red-900 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
