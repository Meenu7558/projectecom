import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { clearUser } from "../../redux/features/userSlice";

export const AdminSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        toast.success("Logged out successfully");
        navigate("/admin/login");
    };

    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Products", path: "/admin/products" },
        { name: "Users", path: "/admin/users" },
        { name: "Orders", path: "/admin/orders" },
        { name: "Manage Sellers", path: "/admin/sellers" }, // Added Manage Sellers menu
    ];

    return (
        <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col justify-between">
            <div>
                <div className="text-2xl font-bold p-6">Admin Panel</div>
                <nav className="flex flex-col gap-2 p-4">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded hover:bg-gray-700 ${
                                    isActive ? "bg-gray-700" : ""
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <button
                onClick={handleLogout}
                className="m-4 p-2 bg-red-500 hover:bg-red-600 rounded"
            >
                Logout
            </button>
        </div>
    );
};
