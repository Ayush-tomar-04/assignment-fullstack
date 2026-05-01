import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/projects", label: "Projects" },
    { to: "/tasks", label: "Tasks" },
  ];

  return (
    <nav className="bg-white border-b px-6 py-3 flex justify-between">
      <div className="font-bold">TaskManager</div>

      <div className="flex gap-3">
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <span>{user.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;