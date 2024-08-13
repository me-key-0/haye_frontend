import React from "react";
import { signInWithEmail, signInWithGoogle } from "../firebase";
import FormInput from "../components/FormInput.component";
import CustomButton from "../components/CustomButton.component";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await signInWithEmail(email, password); // Use Firebase sign-in with email and password
            this.setState({ email: '', password: '' }); // Reset the state
            console.log("Sign in successful");
        } catch (error) {
            alert("Invalid Credentials");
            console.error("Error signing in with email and password", error);
        }
    };

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle(); // Use Firebase Google sign-in
            console.log("Google sign-in successful");
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

    render() {
        const { email, password } = this.state;
        return (
            <section className="bg-whiteSmoke min-h-screen flex items-center justify-center mt-16">
                <div className="w-full max-w-md mx-auto bg-whiteSmoke shadow-lg rounded-lg py-8">
                    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Don’t have an account? <a href="/signup" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create a free account</a>
                        </p>

                        <form onSubmit={this.handleSubmit} className="mt-8 w-full">
                            <div className="space-y-5">
                                <FormInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter email to get started"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />
                                <FormInput
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={this.handleChange}
                                    required
                                />
                                <CustomButton
                                    type="submit"
                                    className="w-full bg-blue-600 border-blue-600 hover:bg-blue-700 focus:bg-blue-700"
                                >
                                    Log in
                                </CustomButton>
                            </div>
                        </form>

                        <div className="mt-3 space-y-3 w-full">
                            <CustomButton
                                type="button"
                                onClick={this.handleGoogleSignIn}
                                className="relative inline-flex items-center justify-center w-full bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black"
                            >
                                <div className="absolute inset-y-0 left-0 p-4">
                                    <svg className="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                        ></path>
                                    </svg>
                                </div>
                                Sign in with Google
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SignIn;
