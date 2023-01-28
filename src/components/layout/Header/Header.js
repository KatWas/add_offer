import React from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

import styles from './Header.module.scss';

import Navbar from '../../features/Navbar/Navbar';

const Header = () => (
  <div className={styles.root}>
    <div className={styles.logoContainer}>
      <img alt='' src={`${process.env.PUBLIC_URL}/images/logo.svg`} />
      <Link to={'/'}>YOUR <span>BOARD</span></Link>
    </div>
    <Navbar />
  </div>
);

export default Header;