import React from 'react';
import PropTypes from 'prop-types';

import './square.scss';

/**
 * @exports
 * @class Square
 * @extends Component
 * @classdesc Creates Square Component
 *
 * @returns {JSX} Square Component
 */
const Square = ({ value, onClick }) => {
  const show = typeof value === 'string' ? 'show-font' : 'hide-font';
  return (
    <button type="submit" className="square" onClick={onClick}>
      <div className={show}>{value}</div>
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Square;
