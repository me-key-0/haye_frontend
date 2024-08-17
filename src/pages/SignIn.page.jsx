import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux'; // Import connect
import { emailSignInStart, googleSignInStart } from '../redux/Slices/userSlice'; // Import actions
import FormInput from "../components/FormInput.component";
import CustomButton from "../components/CustomButton.component";
import { useNavigate } from 'react-router-dom';

const SignIn = ({ emailSignInStart, googleSignInStart, status, error }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    emailSignInStart(credentials); // Dispatch action to start email sign-in
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleGoogleSignIn = () => {
    googleSignInStart(); // Dispatch action to start Google sign-in
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/'); // Redirect to dashboard on successful sign-in
    }
    if (error) {
      setLocalError(error);
    }
  }, [status, error, navigate]);

  return (
    <section className="bg-whiteSmoke fixed inset-0 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-lg py-8 px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
          <p className="mt-2 text-base text-gray-600">
            Don’t have an account? <a href="/signup" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create a free account</a>
          </p>
          <form onSubmit={handleSubmit} className="mt-8 w-full">
            <div className="space-y-5">
              <FormInput
                type="email"
                name="email"
                id="email"
                placeholder="Enter email to get started"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              <FormInput
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <CustomButton
                type="submit"
                className="w-full bg-blue-600 border-blue-600 hover:bg-blue-700 focus:bg-blue-700"
                disabled={status === 'loading'} // Disable button while loading
              >
                {status === 'loading' ? 'Logging in...' : 'Log in'}
              </CustomButton>
            </div>
          </form>
          {localError && <p className="mt-3 text-red-500">{localError}</p>} {/* Display error message */}
          <div className="mt-5 space-y-3 w-full">
            <CustomButton
              type="button"
              onClick={handleGoogleSignIn}
              className="relative inline-flex items-center justify-center w-full bg-white text-gray-500 border-2 border-gray-300 hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black"
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </div>
              <span className="ml-10">Sign in with Google</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
}

SignIn.propTypes = {
  emailSignInStart: PropTypes.func.isRequired,
  googleSignInStart: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  status: state.user.status,
  error: state.user.error
});

const mapDispatchToProps = {
  emailSignInStart,
  googleSignInStart
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
