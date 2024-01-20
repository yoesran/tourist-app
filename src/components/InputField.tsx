import { ChangeEvent } from "react";

interface InputFieldProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  placeholder: string;
}

const InputField = ({ name, value, onChange, error, placeholder }: InputFieldProps) => (
  <div>
    <input
      type={name === "password" ? "password" : "text"}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-gray-600 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
      autoComplete="off"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default InputField;