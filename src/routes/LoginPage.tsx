import { Navigate } from "react-router-dom";

import LoginForm from "../components/LoginForm"

const LoginPage = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <main className="bg-slate-200 h-[100svh]">
      <div className="w-full h-full flex justify-center items-center px-3">
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage