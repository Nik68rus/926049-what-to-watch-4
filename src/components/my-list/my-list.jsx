import React from 'react';
import PropTypes from 'prop-types';
import UserBlock from '../user-block/user-block';
import Footer from '../footer/footer';
import {getMovies} from '../../reducer/data/selectors';
import {connect} from 'react-redux';
import FilmList from '../film-list/film-list';
import {AppRoute} from '../../constants';
import {Link} from 'react-router-dom';

const MyList = (props) => {
  const {authorizationStatus, favoriteList, onCardClick} = props;
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock authorizationStatus={authorizationStatus} />
      </header>

      <FilmList films={favoriteList} onCardClick={onCardClick} />

      <Footer />
    </div>

  );
};

MyList.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  favoriteList: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteList: getMovies(state).filter((movie) => movie.isFavorite),
});

export {MyList};
export default connect(mapStateToProps)(MyList);
