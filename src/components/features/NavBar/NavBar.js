import React from 'react';
//import PropTypes from 'prop-types';

import styles from './Navbar.module.scss';

import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';

import Button from '../../common/Button/Button';

const Navbar = () => {
  const user = useSelector(state => getUser(state));

  return (
    <div className={styles.navbar}>
      {!user && <Button type='a' to='/auth/google' name='Login' />}
      {user && <Button type='link' to='/ads/own' name='My ads' />}
      {user && <Button type='link' to='/ad/add' name='Add ad' />}
      {user && <Button type='a' to='/auth/logout' name='Logout' />}
    </div>
  );
};

export default Navbar;