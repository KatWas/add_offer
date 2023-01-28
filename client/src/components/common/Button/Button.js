import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({ type, to, name, action }) => {

  if (type === 'link') {
    return (
      <Link className={styles.button} to={to}>{name}</Link>
    );
  } else if (type === 'a') {
    return (
      <a className={styles.button} href={to}>{name}</a>
    );
  } else {
    return (
      <button className={styles.button} type={action}>{name}</button>
    );
  }

};

Button.propTypes = {
  type: PropTypes.string,
  to: PropTypes.string,
  name: PropTypes.string,
  action: PropTypes.string,
};

export default Button;