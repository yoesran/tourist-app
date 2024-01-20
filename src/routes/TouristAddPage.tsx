import { useNavigate, useRevalidator, useRouteLoaderData } from 'react-router-dom';
import InputField from '../components/InputField';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { defaultURL } from '../constants';

interface Tourist {
  createdat: string;
  id: string;
  tourist_email: string;
  tourist_location: string;
  tourist_name: string;
  tourist_profilepicture: string;
}

interface ResponseData {
  page: string;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  data: Tourist[];
}

interface FormValues {
  email: string;
  location: string;
  name: string;
}

interface FormErrors {
  email: string | null;
  location: string | null;
  name: string | null;
}

const TouristAddPage = () => {
  const revalidator = useRevalidator();
  const data = useRouteLoaderData("tourists") as ResponseData;
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    location: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null,
    location: null,
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
    if (!formValues.location.trim()) {
      setFormErrors((prevErrors) => ({ ...prevErrors, location: "Location is required" }));
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

    const token = localStorage.getItem("token");
    const { email, location, name } = formValues;
    const response = await fetch(`${defaultURL}/api/Tourist`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
        tourist_email: email,
        tourist_location: location,
        tourist_name: name
      })
    });
    
    const responseData = await response.json();
    // eslint-disable-next-line no-prototype-builtins
    if (responseData.hasOwnProperty("message") && responseData.message != "success") {
      setResponseError(responseData.message);
      setIsSubmitting(false);
      return;
    }

    revalidator.revalidate();
    navigate(`/?page=${data.total_pages}`);
  };

  const handleNavigate = () => {
    const newUrl = `/${location.search}`;
    navigate(newUrl);
  };

  return (
    <>
      <button onClick={handleNavigate} className="fixed top-0 left-0 w-full h-[100svh] bg-black/60 z-10" />
      <dialog open className="z-10 m-0 p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <form method='post' className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <InputField
            name="email"
            value={formValues.email}
            onChange={handleChange}
            error={formErrors.email ?? ""}
            placeholder="Email"
          />
          <InputField
            name="location"
            value={formValues.location}
            onChange={handleChange}
            error={formErrors.location ?? ""}
            placeholder="Location"
          />
          <InputField
            name="name"
            value={formValues.name}
            onChange={handleChange}
            error={formErrors.name ?? ""}
            placeholder="Name"
          />
          <button disabled={isSubmitting} className={`mt-5 px-3 py-2 rounded-lg ${isSubmitting ? "bg-gray-600" : "bg-blue-600" } text-white duration-200`} type="submit">
            Add
          </button>
          {responseError && <p className="text-red-500 text-center">{responseError}</p>}
        </form>
      </dialog>
    </>
  )
}

export default TouristAddPage