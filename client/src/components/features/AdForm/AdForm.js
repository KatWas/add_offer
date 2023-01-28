import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../../../redux/userRedux';
import { dateToStr } from '../../../utils/dateToStr';
import styles from './AdForm.module.scss';

import Button from '../../common/Button/Button';



const AdForm = ({ action, button, header, _id='', title = '', content='', price=0, location='', images='', published='', updated='', author='', phone='', status='draft' }) => {
  const navigate = useNavigate();

  const user = useSelector(state => getUser(state));

  const date = dateToStr(new Date());

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newPrice, setNewPrice] = useState(price);
  const [newLocation, setNewLocation] = useState(location);
  const [newImages, setNewImages] = useState(images);
  const [newPublished, setNewPublished] = useState(published);
  const [newUpdated, setNewUpdated] = useState(date);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newPhone, setNewPhone] = useState(phone);
  const [newStatus, setNewStatus] = useState(status);
  const [error, setError] = useState({ title: '', content: '', author: '' });

  const changePrise = value => {
    if (!Number.isNaN(value)) setNewPrice(parseInt(value));
  };

  useEffect(() => {
    if (!published) {
      setNewPublished(date);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    let err = {
      title: null,
      content: null,
      author: null,
    };

    if (newTitle.length < 10) err.title = 'error';
    else if (newContent.length < 20) err.content = 'error';
    else if (newAuthor !== user.email) err.author = 'error';

    if (!err.title && !err.content && !err.author) {
      const formData = new FormData();
      formData.append('title', newTitle);
      formData.append('content', newContent);
      formData.append('price', newPrice);
      formData.append('published', newPublished);
      formData.append('updated', newUpdated);
      formData.append('author', newAuthor);
      formData.append('phone', newPhone);
      formData.append('status', newStatus);
      formData.append('location', newLocation);
      formData.append('file', newImages);

      action(formData, _id);
      navigate('/');
    } else setError(values => ({ ...values, title: err.title, content: err.content, author: err.author }));
  };

  return (
    <div className={styles.formContainer}>
      <h2>{header}</h2>
      <form onSubmit={e => onSubmit(e)}>
        <label><span>Title</span>
          <input className={styles.textInput} type='text' value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          {error.title && <span className={styles.error}>This field needs to contain at least 10 characters</span>}
        </label>
        <label><span>Content</span>
          <textarea className={styles.textareaInput} value={newContent} onChange={e => setNewContent(e.target.value)} />
          {error.content && <span className={styles.error}>This field needs to contain at least 20 characters</span>}
        </label>
        <label><span>Price*</span>
          <input className={styles.numberInput} type='number' value={newPrice} onChange={e => changePrise(e.target.value)}/>
        </label>
        <label><span>Location*</span>
          <input className={styles.textInput} type='text' value={newLocation} onChange={e => setNewLocation(e.target.value)}/>
        </label>
        <label><span>Email</span>
          <input className={styles.textInput} type='text' value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
          {error.author && <span className={styles.error}>This field needs to contain your email address</span>}
        </label>
        <label><span>Phone*</span>
          <input className={styles.textInput} type='text' value={newPhone} onChange={e => setNewPhone(e.target.value)}/>
        </label>
        <label><span>Status</span>
          <select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
            <option value='draft'>Draft</option>
            <option value='published'>Published</option>
            <option value='closed'>Closed</option>
          </select>
        </label>
        <label><span>Image*</span>
          <input type='file' accept='image/png, image/jpeg' onChange={e => setNewImages(e.target.files[0])}/>
        </label>
        <Button type='button' action='submit' name={button} />
      </form>
      <p>* - not required</p>
    </div>
  );
};

AdForm.propTypes = {
  button: PropTypes.string,
  action: PropTypes.func,
  header: PropTypes.string,
  _id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  price: PropTypes.number,
  location: PropTypes.string,
  images: PropTypes.string,
  published: PropTypes.string,
  updated: PropTypes.string,
  author: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.string,
};

export default AdForm;