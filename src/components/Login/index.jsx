'use client'
import React, { useState } from "react"
import Styles from "./styles.module.css"
import Link from "next/link"


export default function Index(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginFailed, setLoginFailed] = useState('')


    const formSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log('Authentication token:', token);
                window.location.href = "/";
            } else {
                setLoginFailed("Geef de juiste email adress of wachtwoord")
                console.log('Login NIET GELUKT')
            }
        } catch (error) {
            setLoginFailed("Geen response van server")
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={formSubmit} className={Styles.mainContainer}>
            <label className={Styles.errorLabel}>{loginFailed}</label>
            <div className={Styles.titleContainer}>
                <div>Login</div>
            </div>
            <br />
            <input
                value={email}
                placeholder="Typ je e-mail "
                onChange={(e) => setEmail(e.target.value)}
                className={Styles.inputBox}
                type="email"
            />
            <label className={Styles.errorLabel}>{emailError}</label>
            <br />
            <input
                value={password}
                placeholder="Typ je wacthwoord"
                onChange={(e) => setPassword(e.target.value)}
                className={Styles.inputBox}
                type="password"
            />
            <label className={Styles.errorLabel}>{passwordError}</label>
            <br />
            <button className={Styles.button} type="submit">Login</button>
            <br />
            <div>Wachtwoord vergeten?<Link href="/forgotpassword"> Klik hier</Link></div>
            <div>Heb je nog geen account<Link href="/Register"> Registreer hier</Link></div>
        </form>
    )
}