import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="content__container padding notFound">
    <h2 className="notFound__title">404</h2>
    <p className="notFound__subtitle">This is not the page you are looking for...</p>
    <Link className="notFound__btn" to="/">Back to home</Link>
  </section>
);

export default NotFound;
