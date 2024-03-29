import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, SyntheticEvent, useState } from "react";

import { defaultURL } from "../constants";
import InputField from "../components/InputField";

interface FormValues {
  email: string;
  password: string;
  name: string;
}

interface FormErrors {
  email: string | null;
  password: string | null;
  name: string | null;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null,
    password: null,
    name: null,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!formValues.email.trim()) {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
      isValid = false;
    }
    if (!formValues.password.trim()) {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: "Password is required" }));
      isValid = false;
    }
    if (!formValues.name.trim()) {
      setFormErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const { email, password, name } = formValues;
    const response = await fetch(`${defaultURL}/api/authaccount/registration`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
        email,
        password,
        name
      })
    });
    
    const responseData = await response.json();
    if (responseData.message != "success") {
      setResponseError(responseData.message);
      setIsSubmitting(false);
      return;
    }

    navigate("/login");
  };

  return (
    <form method="post" onSubmit={handleSubmit} className="w-[500px] bg-white rounded-xl px-5 py-4 flex flex-col gap-3 font-semibold">
      <h1 className="self-center text-3xl font-bold mt-2 mb-5">Register</h1>
      <InputField
        name="email"
        value={formValues.email}
        onChange={handleChange}
        error={formErrors.email ?? ""}
        placeholder="Email"
      />
      <InputField
        name="password"
        value={formValues.password}
        onChange={handleChange}
        error={formErrors.password ?? ""}
        placeholder="Password"
      />
      <InputField
        name="name"
        value={formValues.name}
        onChange={handleChange}
        error={formErrors.name ?? ""}
        placeholder="Name"
      />
      <button disabled={isSubmitting} className={`mt-5 px-3 py-2 rounded-lg ${isSubmitting ? "bg-gray-600" : "bg-blue-600" } text-white duration-200`} type="submit">
        Register
      </button>
      {responseError && <p className="text-red-500 text-center">{responseError}</p>}

      <Link to="/login" className="text-center text-blue-500">Login</Link>
    </form>
  );
};

export default RegisterForm;
