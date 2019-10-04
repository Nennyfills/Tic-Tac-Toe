import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

/**
 * @exports
 * @function Button
 * @desc Creates Button Component
 *
 * @returns {JSX} Button Component
 */
const Button = ({ value, onClick }) => (
  <button type="submit" className="btn outLook" onClick={onClick}>{value}</button>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
