import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { getUser } from '../../../redux/userRedux';

import AdsList from '../AdsList/AdsList';

const OwnAds = () => {

  const user = useSelector(state => getUser(state));

  if (!user) {
    return <Navigate to={'/user/no-permission'} />;
  }

  return  (
    <AdsList user={user.email} />
  );
};

export default OwnAds;