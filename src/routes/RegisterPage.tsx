import { Navigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm"; 

const RegisterPage = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <main className="bg-slate-200 h-[100svh]">
      <div className="w-full h-full flex justify-center items-center px-3">
        <RegisterForm />
      </div>
    </main>
  )
}

export default RegisterPage