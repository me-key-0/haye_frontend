import PropTypes from 'prop-types';

const FormInput = ({ type = 'text', name, id, placeholder, value, onChange, required = false, className }) => {
    return (
        <div>
            <label htmlFor={id} className="text-base font-medium text-gray-900">
                {placeholder}
            </label>
            <div className="mt-2.5">
                <input
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${className}`}
                />
            </div>
        </div>
    );
};

FormInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string
};

export default FormInput;
