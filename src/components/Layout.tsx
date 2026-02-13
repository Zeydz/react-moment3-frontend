import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const baseStyle = "px-3 py-1 rounded-lg transition";

  const activeStyle = "bg-blue-600 text-white";

  const inactiveStyle = "text-white hover:text-gray-300";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 bg-[#24252A] border-b shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="text-xl font-bold text-white">MOMENT 3</div>

          <div className="flex gap-4 font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Hem
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Logga in
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-5xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
