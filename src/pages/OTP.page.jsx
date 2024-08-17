// components/OtpPage.jsx
import { useState } from 'react';
import OtpInput from 'react-otp-input';

const OtpPage = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your OTP submission logic here
    console.log('OTP Submitted:', otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              separator={<span className="w-2"></span>}
              inputStyle="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
