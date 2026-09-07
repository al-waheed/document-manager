import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../store/authSlice";
import {
  DocumentTextIcon,
  DocumentIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    if (!token || (user?.name && user?.avatar)) return;

    fetch("http://localhost:4000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load user profile");
        return response.json();
      })
      .then((profile) => dispatch(updateUser(profile)))
      .catch((error) => console.error("Profile load failed:", error));
  }, [dispatch, token, user?.name, user?.avatar]);
  const toggleShowIcon = () => {
    setShowIcon(!showIcon);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex  items-center justify-between h-20">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                DocManager
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <HomeIcon className="h-5 w-5 mr-1" />
                Dashboard
              </Link>
              <Link
                to="/documents"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <DocumentIcon className="h-5 w-5 mr-1" />
                Documents
              </Link>
              <Link
                to="/invoices"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <DocumentTextIcon className="h-5 w-5 mr-1" />
                Invoices
              </Link>
            </div>
            <div className="sm:hidden flex ml-auto">
              <button onClick={toggleShowIcon}>
                {showIcon ? (
                  <Bars3Icon className="h-8 w-8 text-primary-600" />
                ) : (
                  <XMarkIcon className="h-8 w-8 text-primary-600" />
                )}
              </button>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.name || "User"}'s profile`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold"
                >
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-medium text-gray-800">
                  {user.name || user.email}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log out"
                  aria-label="Log out"
                  className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
