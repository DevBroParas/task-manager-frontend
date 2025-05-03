import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  FolderKanban,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const linkClasses = (isActive) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <aside
      className={`h-screen ${collapsed ? "w-20" : "w-64"} bg-gradient-to-b from-blue-100 to-white border-r shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out rounded-lg`}
    >
      {/* Top Section with Logo + Toggle */}
      <div className="p-4">
        {/* Logo + Name */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 rounded-full" // Removed the border here
            />
            {!collapsed && (
              <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                TaskExpress
              </h1>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-black transition-all duration-200"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) => linkClasses(isActive)}
            title="Dashboard"
          >
            <Home size={20} />
            {!collapsed && <span className="transition-all duration-200 ease-in-out">Dashboard</span>}
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) => linkClasses(isActive)}
            title="Projects"
          >
            <FolderKanban size={20} />
            {!collapsed && <span className="transition-all duration-200 ease-in-out">Projects</span>}
          </NavLink>
        </nav>
      </div>

      {/* Bottom Logout */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-500 hover:text-red-600 text-sm transition-all duration-200"
          title="Logout"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
