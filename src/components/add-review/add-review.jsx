import React from 'react';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filmPropsValidation} from '../../props-validation';
import AddReviewForm from '../add-review-form/add-review-form';
import NotFoundPage from '../not-found-page/not-found-page';

const AddReview = ({films}) => {
  const paramsId = parseInt(useParams().id, 10);
  const film = films.find(({id}) => paramsId === id);

  if (!film) {
    return <NotFoundPage />;
  }

  const {name, backgroundImage, posterImage, id} = film;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>
      <div className="add-review">
        <AddReviewForm />
      </div>
    </section>
  );
};

AddReview.propTypes = {
  films: PropTypes.arrayOf(filmPropsValidation.film).isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
});

export {AddReview};
export default connect(mapStateToProps, null)(AddReview);
