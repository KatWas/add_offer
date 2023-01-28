import React, {useEffect} from 'react';
//import PropTypes from 'prop-types';

import styles from './SingleAd.module.scss';

import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/userRedux';


import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Button from '../../common/Button/Button';

const SingleAd = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(state => getUser(state));

  if (!ad) return <Navigate to='/' />;
  return (
    <div className={styles.adContainer}>
      {user && user.email === ad.author ? <div className={styles.linkContainer}>
        <Button type='link' name='Edit' to={`/ad/edit/${id}`} />
      </div> : null}
      {ad.images && <div className={styles.imageContainer}>
        <img alt='' src={`${process.env.PUBLIC_URL}/images/uploads/${ad.images}`} />
      </div>}
      <div className={styles.contentContainer}>
        <p className={styles.title}>{ad.title}</p>
        <p className={styles.content}>{ad.content}</p>
        {ad.price || ad.location ? <p className={styles.header}>Details:</p> : null}
        {ad.price !== 0 && <p><span>Price:</span> ${ad.price}</p>}
        {ad.location && <p><span>Location:</span> {ad.location}</p>}
        <p className={styles.header}>Contact:</p>
        <p><span>email:</span> {ad.author}</p>
        {ad.phone && <p><span>phone:</span> {ad.phone}</p>}
        <p className={styles.date}>Last updated date: { ad.updated }</p>
        <p className={styles.date}>Published date: { ad.published }</p>
      </div>
    </div>
  );
};

export default SingleAd;