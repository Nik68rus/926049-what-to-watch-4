import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import UserBlock from '../user-block/user-block';
import {connect} from 'react-redux';
import {getMovies} from '../../reducer/data/selectors';
import {getActiveMovie} from '../../reducer/application/selectors';
import {getMovieIndex} from '../../utils';
import {Operation as DataOperation} from '../../reducer/data/data';
import {getAuthStatus} from '../../reducer/user/selectors';
import {AppRoute} from '../../constants';
import {Link} from 'react-router-dom';

class NewReview extends PureComponent {
  constructor(props) {
    super(props);
    this.formRef = createRef();
    this.commentRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit, movie, history} = this.props;
    evt.preventDefault();
    onSubmit({
      rating: this.formRef.current.rating.value,
      comment: this.commentRef.current.value,
    }, movie.id);
    history.goBack();
  }

  render() {
    const {movie} = this.props;
    const {background, title, backgroundColor, poster} = movie;

    return (
      <section className="movie-card movie-card--full" style={{backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">{title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <UserBlock />

          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={poster} alt={title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this.handleSubmit} ref={this.formRef}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" />
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" ref={this.commentRef}></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" onClick={this.handleSubmit}>Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: getMovies(state)[getMovieIndex(getMovies(state), getActiveMovie(state))],
  authorizationStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(comment, id) {
    dispatch(DataOperation.postComment(comment, id));
  },
});

NewReview.propTypes = {
  movie: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
};

export {NewReview};
export default connect(mapStateToProps, mapDispatchToProps)(NewReview);
