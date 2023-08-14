import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "./LoginPage.css";
import Card from "../components/Card";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const LoginPage = ({ setIsLoggedIn, onSwitchForm }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState({});

    const errorMessagesList = {
        invalidUsername: "Invalid username",
        invalidPassword: "Invalid password",
        noUsername: "Username is required",
        noPassword: "Password is required",
        wrongAcc: "Your username/ password is wrong",
    };

    const validateForm = () => {
        const errors = {};

        if (!username) {
        errors.username = errorMessagesList.noUsername;
        }

        if (!password) {
        errors.password = errorMessagesList.noPassword;
        }

        setErrorMessages(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        if (!validateForm()) {
            return;
        }

        const response = await axios.post(
            "loginURI(from API)",
            {
                username: username,
                password: password,
            }
        );

        if (response.status === 200) {
            // Login successful
            setErrorMessages({});
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token); // Save token to local storage
            setIsLoggedIn(true);
            Swal.fire('Success', 'Logged in successfully', 'success');
        } else {
            // Login failed
            setErrorMessages({
            password: errorMessagesList.invalidPassword,
            });
            Swal.fire('Error', 'Invalid password', 'error');
        }
        } catch (error) {
        // Login failed
        setErrorMessages({
            username: errorMessagesList.wrongAcc,
        });
        Swal.fire('Error', 'Login failed', 'error');
        console.error("Login failed");
        }
    };

    const renderErrorMsg = (name) => {
        if (errorMessages[name]) {
        return <div className="error_msg">{errorMessages[name]}</div>;
        }
    };
    
    return (
        <>
        <div className="LoginPage-wholePage">
            <Link to="/" className="invisibleHomeLink"></Link>
            <Card>
                <h1 className="LoginPage--title">User Login</h1>
        
                <form onSubmit={handleSubmit}>
                <div className="LoginPageForms_container">
                    <div className="LoginPage_icon_container">
                    <PersonIcon className="LoginPage--icon" />
                    <input
                        type="text"
                        placeholder="Insert your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    {renderErrorMsg("username")}
                    {renderErrorMsg("noUsername")}
        
                    <div className="LoginPage_icon_container">
                    <LockIcon className="LoginPage--icon" />
                    <input
                        type="password"
                        placeholder="Insert your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    {renderErrorMsg("password")}
                    {renderErrorMsg("noPassword")}
                </div>
        
                <button type="submit" className="LoginPage--login_button">
                    Log In
                </button>
                <div className="link_container">
                    <span className="LoginPage--small">Not a Member?</span>
                </div>
                <button
                    type="button"
                    className="LoginPage--register_button"
                    onClick={onSwitchForm}
                >
                    Create User Account
                </button>
                <span className="LoginPage--subtitle"> 2023 Traffooze™</span>
                </form>
            </Card>
        </div>
        </>
    );
}
    
export default LoginPage;


