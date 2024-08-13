import React from "react";

import FormInput from "../components/FormInput.component";
import CustomButton from "../components/CustomButton.component";
// import user from "../services/user.data";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await signUp(username, email, password); // Call your sign-up function
      this.setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }); // Reset the state
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    // console.log(this.state);
    const { username, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl mb-4">I do not have an account</h2>
        <span className="text-gray-600 mb-6 block">
          Sign up with your email and password
        </span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            label="userName"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Sign up</CustomButton>
        </form>
      </div>
    );
  }
}

// Simulated sign-up function
const signUp = async (username, email, password) => {
  const obj = {
    username,
    email,
    password,
  };
  // Check if the email already exists
  // const existingUser = user.find(u => u.email === email);
  // if (existingUser) {
  //     throw new Error("User already exists with this email");
  // }

  // Create a new user object
  // const newUser = {
  //     id: (user.length + 1).toString(),
  //     displayName,
  //     email,
  //     password, // this has to be hashed
  //     favorites: [],
  //     isSignedIn: true,
  //     reviews: []
  // };

  // Add the new user to the user array
  // user.push(newUser);
  // console.log("User signed up successfully:", newUser);
  // return newUser;
  console.log("before fetching...");
  const response = await fetch("http://localhost:3000/users/register", {
    method: "POST", // Specify the request method
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify(obj), // Convert the data object to JSON
  });

  console.log("fetching...");
  console.log(response);
  if (!response.ok) {
    const error = await response.json();
    console.error("Error :", error);
    return;
  }

  const result = await response.json();
  console.log(result);
  return;
};

export default SignUp;
