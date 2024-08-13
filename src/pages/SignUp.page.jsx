import React from 'react';
import user from '../services/user.data';
import FormInput from '../components/FormInput.component';
import CustomButton from '../components/CustomButton.component';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            await signUp(displayName, email, password);
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            console.log("Sign up successful");
        } catch (error) {
            console.error("Error signing up", error);
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-whiteSmoke">
                <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg py-6 px-4">
                    <div className="flex flex-col items-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-1 text-base text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/signin"
                                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                            >
                                Sign in
                            </a>
                        </p>

                        <form onSubmit={this.handleSubmit} className="mt-6 w-full">
                            <div className="space-y-4">
                                <FormInput
                                    type="text"
                                    name="displayName"
                                    id="displayName"
                                    placeholder="Display Name"
                                    value={displayName}
                                    onChange={this.handleChange}
                                    required
                                />
                                <FormInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />
                                <FormInput
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handleChange}
                                    required
                                />
                                <FormInput
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={this.handleChange}
                                    required
                                />
                                <CustomButton
                                    type="submit"
                                    className="bg-blue-600 border-blue-600 hover:bg-blue-700 focus:bg-blue-700"
                                >
                                    Sign up
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default SignUp;

const signUp = async (displayName, email, password) => {
    // Check if the email already exists
    const existingUser = user.find(u => u.email === email);
    if (existingUser) {
        throw new Error("User already exists with this email");
    }

    // Create a new user object
    const newUser = {
        id: (user.length + 1).toString(),
        displayName,
        email,
        password, // this has to be hashed
        favorites: [],
        isSignedIn: true,
        reviews: []
    };

    // Add the new user to the user array
    user.push(newUser);
    console.log("User signed up successfully:", newUser);
    return newUser;
};
