import { Link, LoaderFunctionArgs, Outlet, useLoaderData, useNavigate } from "react-router-dom";

import { defaultURL } from "../constants";

interface Tourist {
  createdat: string;
  id: string;
  tourist_email: string;
  tourist_location: string;
  tourist_name: string;
  tourist_profilepicture: string;
}

const TouristPage = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as Tourist;

  async function handleDelete() {
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch(`${defaultURL}/api/Tourist/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          tourist_email: data.tourist_email,
          tourist_location: data.tourist_location,
          tourist_name: data.tourist_name
        })
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      await response.json();
      navigate(-1);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  return (
    <>
      <Outlet />
      <div className="container mx-auto px-3 py-5 flex flex-col gap-3 overflow-hidden">
        <Link
          to={'..'}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="underline font-semibold"
        >
         ⬅️Kembali
        </Link>
        <div className="relative self-center shadow-md rounded-xl flex gap-5 bg-black/60 pr-5 text-white">
          <img src={data.tourist_profilepicture} alt="" className="w-[100px] lg:w-auto rounded-l-xl object-cover"/>
          <div className="flex flex-col justify-center py-5 overflow-hidden text-sm">
            <p className="">Email: <span className="font-semibold">{data.tourist_email}</span></p>
            <p className="">Name: <span className="font-semibold">{data.tourist_name}</span></p>
            <p className="">Location: <span className="font-semibold">{data.tourist_location}</span></p>
          </div>

          <Link 
            to={"edit"} 
            replace
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-yellow-100 shadow-2xl w-[30px] h-[30px] flex justify-center items-center rounded-full"
          >✏️</Link>  

          <button 
            onClick={handleDelete}
            className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-red-100 shadow-2xl w-[30px] h-[30px] flex justify-center items-center rounded-full"
          >🗑️</button>
        </div>
      </div>
    </>
  )
}

export default TouristPage

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  
  try {
    const response = await fetch(`${defaultURL}/api/Tourist/${params.id}`, {
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