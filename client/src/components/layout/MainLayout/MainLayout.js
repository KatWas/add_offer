import React from 'react';
import PropTypes from 'prop-types';

import styles from './MainLayout.module.scss';

const MainLayout = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;