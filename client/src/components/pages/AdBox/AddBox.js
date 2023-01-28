import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import styles from './AdBox.module.scss';

const AdBox = ({ _id, title, updated, images, price, location, status}) => {

  return (
    <div className={styles.adContainer}>
      <Link to={'/ad/' + _id}>
        {status !== 'published' && <p className={styles.status}>{ status }</p>}
        <div className={styles.imageContainer}>
          <img alt='' src={`${process.env.PUBLIC_URL}/images/uploads/${images}`} />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.title_price}>
            <p>{title}</p>
            {price !== 0 && <p>${price}</p>}
          </div>
          <div className={styles.location_updated}>
            <p>{location}</p>
            <p>{updated}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

AdBox.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  updated: PropTypes.string,
  location: PropTypes.string,
  images: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.string,
};

export default AdBox;