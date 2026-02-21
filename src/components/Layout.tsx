import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import { useState } from "react";
import Spinner from "./Spinner";

export default function Layout() {
  const baseStyle = "px-3 py-1 rounded-lg transition";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "text-white hover:text-gray-300";

  const { user, logout, loading, error, setError } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 bg-[#24252A] border-b shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <NavLink className="text-xl font-bold text-white" to="/">
            MOMENT 3
          </NavLink>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4 font-medium items-center">
              {/* Home link */}
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                Hem
              </NavLink>

              {/* Show neither login nor user until loading finished */}
              {loading ? (
                <Spinner size="sm" className="text-gray-300" />
              ) : !user ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Logga in
                </NavLink>
              ) : (
                <>
                  {/* If logged in, show below: */}
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                    }
                  >
                    Admin
                  </NavLink>

                  <span className="text-sm text-gray-300">
                    Inloggad som:{" "}
                    <span className="text-white">{user.username}</span>
                  </span>

                  <button
                    onClick={logout}
                    className="cursor-pointer text-sm text-red-400 hover:text-red-300 transition"
                  >
                    Logga ut
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
            >
              {mobileOpen ? (
                /* SVGs found online */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Show menu when mobileOpen is true */}
        {mobileOpen && (
          <div className="md:hidden bg-[#24252A] border-t px-4 pb-4">
            <div className="flex flex-col gap-3 mt-2">
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                Hem
              </NavLink>

              {loading ? (
                <Spinner size="sm" className="text-gray-300" />
              ) : !user ? (
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                  }
                >
                  Logga in
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
                    }
                  >
                    Admin
                  </NavLink>

                  <div className="text-sm text-gray-300">
                    Inloggad som:{" "}
                    <span className="text-white">{user.username}</span>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="text-sm text-red-400 hover:text-red-300 transition text-left"
                  >
                    Logga ut
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Error messages at the top */}
      {error && (
        <div className="bg-red-50 border-t border-red-200">
          <div className="max-w-7xl mx-auto p-3 flex items-center justify-between text-red-700">
            <div>{error}</div>
            <button
              onClick={() => setError(null)}
              className="text-sm text-red-500 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
