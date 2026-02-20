import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export default function Layout() {
  const baseStyle = "px-3 py-1 rounded-lg transition";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "text-white hover:text-gray-300";

  const { user, logout, loading, error, setError } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 bg-[#24252A] border-b shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <NavLink className="text-xl font-bold text-white" to="/">MOMENT 3</NavLink>

          <div className="flex gap-4 font-medium items-center">
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
              <span className="text-sm text-gray-300">Loading...</span>
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
        </div>
      </nav>

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
