import PropTypes from 'prop-types';

const CustomButton = ({ type = 'button', onClick, className, children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 rounded-md focus:outline-none ${className}`}
        >
            {children}
        </button>
    );
};

CustomButton.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default CustomButton;
