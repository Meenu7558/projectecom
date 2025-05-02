import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ErrorPage = () => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);
    const role = userData?.role;

    const user = {
        home_route: role === "admin" ? "/admin" : "/",
    };

    console.log("role===", role);

    return (
        <div>
            <h1>404 - Page Not Found!</h1>
            <button className="btn btn-accent" onClick={() => navigate(user.home_route)}>
                Navigate to Home
            </button>
        </div>
    );
};
