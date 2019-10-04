import React from 'react';
import PropTypes from 'prop-types';

import './box.scss';

/**
 * @exports
 * @class Box
 * @extends Component
 * @classdesc Creates Box Component
 *
 * @returns {JSX} Box Component
 */
const Box = ({ value }) => (
  <div className="box">
    {value}
  </div>
);


Box.propTypes = {
  value: PropTypes.string.isRequired,
};


export default Box;
