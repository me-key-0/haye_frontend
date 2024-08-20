import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography } from '@mui/material';
import { verifyOtpStart } from '../redux/Slices/userSlice';

// OTP Component using MUI
const OTP = ({ separator, length, value, onChange }) => {
  const inputRefs = React.useRef([]);

  const focusInput = (targetIndex) => {
    inputRefs.current[targetIndex]?.focus();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
        }
        break;
      case 'Backspace':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
        }
        onChange(prevOtp => prevOtp.slice(0, currentIndex - 1) + prevOtp.slice(currentIndex));
        break;
      case 'Delete':
        event.preventDefault();
        onChange(prevOtp => prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1));
        break;
      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    onChange(prevOtp => {
      const otpArray = prevOtp.split('');
      otpArray[currentIndex] = currentValue;
      return otpArray.join('');
    });
    if (currentValue && currentIndex < length - 1) {
      focusInput(currentIndex + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <TextField
            inputRef={el => (inputRefs.current[index] = el)}
            value={value[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputProps={{
              maxLength: 1,
              'aria-label': `Digit ${index + 1} of OTP`,
            }}
            variant="outlined"
            size="small"
            sx={{
              width: 40,
              height: 40,
              textAlign: 'center',
              borderRadius: 2,
              '& input': { textAlign: 'center', fontFamily: 'Arial, sans-serif' },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: 'grey.400',
                },
                '&:hover fieldset': {
                  borderColor: 'blue.400',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue.500',
                },
              },
            }}
          />
          {index < length - 1 && separator}
        </React.Fragment>
      ))}
    </Box>
  );
};

OTP.propTypes = {
  separator: PropTypes.node.isRequired,
  length: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// OtpPage Component
const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyOtpStart({ otp }));
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h5" align="center" gutterBottom>
          Enter OTP
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className="flex justify-center mb-6">
            <OTP separator={<span className="mx-2">-</span>} value={otp} onChange={setOtp} length={6} />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Verify OTP
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default OtpPage;
