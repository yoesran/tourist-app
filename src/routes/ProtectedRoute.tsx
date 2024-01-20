import { useNavigate, Outlet, useLocation, Navigate, useNavigation, NavLink } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    navigate("/login");
  }

  if (!token) {
    localStorage.setItem("requestedUrl", location.pathname);
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 bg-blue-800 px-3 py-5">
        <div className="container mx-auto flex justify-between items-center text-white font-semibold">
          <div className="flex gap-3 items-center">
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-black bg-white rounded-lg px-3 py-2"
                  : isPending 
                    ? "opacity-50" 
                    : "px-3 py-2"
              }
              to="/"
            >Home</NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-black bg-white rounded-lg px-3 py-2"
                  : isPending 
                    ? "opacity-50" 
                    : "px-3 py-2"
              }
              to="/profile"
            >Profile</NavLink>
          </div>

          <button className="bg-red-500 rounded-lg px-3 py-2 text-white" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
      <div className={`${navigation.state === "loading" ? 'opacity-60' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};
