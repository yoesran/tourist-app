import { useLoaderData } from "react-router-dom";
import { defaultURL } from "../constants";

interface User {
  avatar: string;
  email: string;
  name: string;
  id: string;
  password: string;
}

const ProfilePage = () => {
  const data = useLoaderData() as User;

  return (
    <div className="container mx-auto px-3 py-5 flex flex-col">
      <div className="self-center shadow-md rounded-xl flex gap-5 bg-black/60 pr-5 text-white">
        <img src={data.avatar} alt="" className="w-[100px] lg:w-auto rounded-l-xl object-cover"/>
        <div className="flex flex-col justify-center py-5 overflow-hidden text-sm">
          <p className="">Id: <span className="font-semibold">{data.id}</span></p>
          <p className="">Email: <span className="font-semibold">{data.email}</span></p>
          <p className="">Name: <span className="font-semibold">{data.name}</span></p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  if (!token || !id) {
    return null;
  }

  try {
    const response = await fetch(`${defaultURL}/api/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error as string);
  }
}