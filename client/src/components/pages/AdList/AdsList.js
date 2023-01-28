import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { getAllAds } from '../../../redux/adsRedux';

import styles from './AdsList.module.scss';

import AdBox from '../AdBox/AdBox';

const AdsList = ({ user }) => {

  const Ads = useSelector(state => getAllAds(state));

  let ads = '';

  if (user) {
    ads = Ads.filter(ad => ad.author === user);
  } else {
    ads = Ads.filter(ad => ad.status === 'published');
  }

  return (
    <div className={styles.adsContainer}>
      {ads.map(ad => (
        <AdBox key={ad._id} {...ad}/>
      ))}
    </div>
  );
};

AdsList.propTypes = {
  user: PropTypes.string,
};

export default AdsList;