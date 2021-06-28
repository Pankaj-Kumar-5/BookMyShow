import React, { useContext } from "react";
import { UserLoginContext } from "../UserLoginContext";
import logo from "../../assets/logo.svg";
import { Button } from "@material-ui/core";
import "./Header.css";
import { Link, useLocation } from 'react-router-dom';

const Header = ({ logoutHandler,movieId }) => {

    const userLoggedIn = useContext(UserLoginContext);

    const location = useLocation();

    const displayBookShow = () => {
        if (location.pathname.includes("movie")) {
            if (userLoggedIn) {
                let path = "/bookShow/"+movieId
                return <Button id="book-show" variant="contained" color="primary" component={Link} to={path}>BOOKSHOW</Button>;
            } else {
                return (
                    <Link
                        to={{
                            pathname: "/login-register-modal",
                            state: { background: location }
                        }}>
                        <Button id="book-show" variant="contained" color="primary">BOOKSHOW</Button>
                    </Link>
                )
            }
        }
    }

    const displayLoginOrLogout = () => {
        if (userLoggedIn) {
            return <Button className="user-state-btn" id="logout-btn" variant="contained" name="logout-btn" onClick={logoutHandler}>LOGOUT</Button>
        } else {
            return (
                <Link
                    to={{
                        pathname: "/login-register-modal",
                        state: { background: location }
                    }}>
                    <Button className="user-state-btn" id="login-btn" variant="contained" name="login-btn">LOGIN</Button>
                </Link >
            )
        }
    }

    return (
        <div id="header">
            <div className="logo">
                <img alt="Logo" className="rotate" src={logo} />
            </div>
            <div className="btn">
                {displayBookShow()}
                {displayLoginOrLogout()}
            </div>
        </div>
    )
}

export default Header;