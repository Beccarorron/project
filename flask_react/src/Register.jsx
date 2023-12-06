import React, { useState } from "react";

export const Register = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");
  let userObject = {"userName": name, "userEmail": email, "userPassword": password, "userPassword2": password2}
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userObject());
	};

	return (
		<div className="auth-form-container">
      <h2>Register</h2>
			<form className="registration-form" onSubmit={handleSubmit}>
				<label htmlFor="name">Full Name</label>
				<input
					value={name}
					id="name"
					name="name"
					placeholder="Full Name"
					onChange={(e) => setName(e.target.value)}/>
				<label htmlFor="email">Email</label>
				<input
					value={email}
					type="email"
					placeholder="youremail@gmail.com"
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
        <label htmlFor="password">Confirm Password</label>
				<input
					value={password2}
					type="password2"
					placeholder="********"
          id="password2"
					name="password2"
					onChange={(e) => setPassword2(e.target.value)}/>
				<button type="submit">Log In</button>
			</form>
			<button className="link-btn"
				onClick={() => {
					props.onFormSwitch("Login");
				}}>
				Already have an accout? Login here.
			</button>
		</div>
	);
};
