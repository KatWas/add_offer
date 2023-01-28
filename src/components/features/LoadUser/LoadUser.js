import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getAdById } from '../../../redux/adsRedux';
import { getUser } from '../../../redux/userRedux';
import { editAdRequest } from '../../../redux/adsRedux';

import AdForm from '../AdForm/AdForm';

const EditAdForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(state => getUser(state));
    const ad = useSelector(state => getAdById(state, id));

    const editAd = (formData, _id) => {
        dispatch(editAdRequest(formData, _id));
    };

    if (!user) {
        return (
            <Navigate to={'/user/no-permission'} />
        );
    }
    return (
        <AdForm action={editAd} button={'Save changes'} header={'Edit your ad'} {...ad} />
    );
};

export default EditAdForm;
