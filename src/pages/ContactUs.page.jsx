import React from "react";
import FormInput from "../components/FormInput.component";
import CustomButton from "../components/CustomButton.component";

class ContactUs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            comment: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, comment } = this.state;

        // Process the form data here, e.g., send it to a backend server

        // Reset the form fields after submission
        this.setState({ name: '', email: '', comment: '' });
        console.log("Form submitted:", { name, email, comment });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { name, email, comment } = this.state;

        return (
            <section className="bg-whiteSmoke min-h-screen fixed w-full top-10 flex items-center justify-center">
                <div className="w-full max-w-2xl mx-auto bg-whiteSmoke shadow-lg rounded-lg py-8">
                    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Contact Us</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Have any questions or comments? Feel free to reach out!
                        </p>

                        <form onSubmit={this.handleSubmit} className="mt-8 w-full">
                            <div className="space-y-5">
                                <FormInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={this.handleChange}
                                    required
                                />
                                <FormInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />
                                <div>
                                    <label htmlFor="comment" className="text-base font-medium text-gray-900">Your Comment</label>
                                    <textarea
                                        name="comment"
                                        id="comment"
                                        rows="3"
                                        placeholder="Enter your comment"
                                        value={comment}
                                        onChange={this.handleChange}
                                        className="block w-full p-4 mt-2.5 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                        required
                                    />
                                </div>
                                <CustomButton
                                    type="submit"
                                    className="w-full bg-blue-600 border-blue-600 hover:bg-blue-700 focus:bg-blue-700"
                                >
                                    Submit
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default ContactUs;
