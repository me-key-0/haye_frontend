import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ role, children }) => {
  const { user, role: userRole } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />; // Redirect to homepage if not authorized
  }

  return children;
};

PrivateRoute.propTypes = {
  role: PropTypes.string,
  children: PropTypes.node.isRequired, // `children` should be of type node and is required
};

export default PrivateRoute;
