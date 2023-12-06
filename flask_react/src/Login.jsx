import React, { useState } from "react";

export const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
	};
	return (
		<div className="auth-form-container">
			<h2>Login</h2>
			<form className="login-form" onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					value={email}
					type="email"
					placeholder="youremail@email.com"
					id="email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}/>
				<label htmlFor="password">Password</label>
				<input
					value={password}
					type="password"
					placeholder="********"
					id="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}/>
				<button type="submit">Log In</button>
			</form>
			<button className="link-btn" onClick={() => {props.onFormSwitch('Register')}}>
				Don't have an accout? Register here.
			</button>
		</div>
	);
};
