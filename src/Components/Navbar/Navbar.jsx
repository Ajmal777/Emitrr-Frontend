import React, { useContext } from "react";
import "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import FlexBox from "../Common/FlexBox";
import { UserContext } from "../../Context/User";
const Navbar = () => {
    const { login } = useContext(UserContext);
    return (
        <FlexBox className="navbar-container" justify={"space-between"}>
            <NavLink to="/">
                <span className="nav-brand">QuizApp</span>
            </NavLink>
            <FlexBox className="links" justify={"space-between"} grow={0.1}>
                {login ? (
                    <>
                        <NavLink to="/exercises">Exercises</NavLink>
                        <NavLink to="/leaderboard">Leaderboard</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                )}
            </FlexBox>
        </FlexBox>
    );
};

export default Navbar;
