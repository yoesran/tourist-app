import { Link, LoaderFunctionArgs, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";

import { defaultURL } from "../constants";
import Pagination from "../components/Pagination";

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

const HomePage = () => {
  const responseData = useLoaderData() as ResponseData;
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    const newUrl = `/add${location.search}`;
    navigate(newUrl);
  };
  
  return (
    <>
      <Outlet />
      <div className="container mx-auto flex flex-col gap-5 my-5 px-3">
        <button onClick={handleNavigate} className="self-end px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold">Tambah Turis</button>

        <div className="flex gap-5 flex-wrap">
          {responseData.data.map((item: Tourist) => {
            return <Link key={item.id} to={`/Tourist/${item.id}`} className="shadow-md grow cursor-pointer rounded-xl flex gap-5 bg-black/60 pr-5 text-white">
              <img src={item.tourist_profilepicture} alt="" className="w-[100px] lg:w-auto rounded-l-xl object-cover"/>
              <div className="flex flex-col justify-center py-5 overflow-hidden text-sm">
                <p className="">Email: <span className="font-semibold">{item.tourist_email}</span></p>
                <p className="">Name: <span className="font-semibold">{item.tourist_name}</span></p>
                <p className="">Location: <span className="font-semibold">{item.tourist_location}</span></p>
              </div>
            </Link>;
          })}
        </div>

        <Pagination activePage={parseInt(responseData.page)} totalPages={responseData.total_pages} pageRange={5}/>
      </div>
    </>
  )
}

export default HomePage

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }: LoaderFunctionArgs) {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const url = new URL(request.url);
  const param = url.searchParams.get("page") ? `page=${url.searchParams.get("page")}` : '';

  try {
    const response = await fetch(`${defaultURL}/api/Tourist?${param}`, {
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
