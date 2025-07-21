import { useNavigate } from "react-router-dom";
export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
    >
      Logout
    </button>
  );
}
