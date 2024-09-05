import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput.component';
import CustomButton from '../components/CustomButton.component';
import { signUpStart } from '../redux/Slices/userSlice';

const SignUp = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (status === 'Loading' && !error) {
            navigate('/otp'); // Redirect to OTP page
        }
    }, [status, error, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        dispatch(signUpStart({ displayName, email, password }));
    };

    return (
        <section className="flex items-center justify-center min-h-screen pt-16 bg-whiteSmoke">
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold leading-tight text-black sm:text-2xl">Sign up</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Already have an account?{' '}
                        <a
                            href="/signin"
                            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                        >
                            Sign in
                        </a>
                    </p>

                    {status === 'failed' && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-4 w-full">
                        <div className="space-y-3">
                            <FormInput
                                type="text"
                                name="displayName"
                                id="displayName"
                                placeholder="Display Name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                            <FormInput
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FormInput
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FormInput
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <CustomButton
                                type="submit"
                                className="bg-blue-600 border-blue-600 hover:bg-blue-700 focus:bg-blue-700 py-2 px-4 text-sm"
                            >
                                Sign up
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
