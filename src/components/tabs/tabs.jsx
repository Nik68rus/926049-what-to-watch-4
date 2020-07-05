import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TabCodes} from '../../constants';
import MovieOverview from '../movie-overview/movie-overview.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';
import MovieReviews from '../movie-reviews/movie-reviews.jsx';
import comments from '../../mocks/comments';

export default class Tabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: TabCodes.OVERVIEW.toLowerCase(),
    };
    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _handleTabClick(name) {
    this.setState((prevState) => ({prevState, activeTab: name.toLowerCase()}));
  }

  _renderTab(tab) {
    switch (tab) {
      case TabCodes.OVERVIEW.toLowerCase():
        return <MovieOverview movie={this.props.movie} />;
      case TabCodes.DETAILS.toLowerCase():
        return <MovieDetails movie={this.props.movie} />;
      case TabCodes.REVIEWS.toLocaleLowerCase():
        return <MovieReviews comments={comments} />;
    }

    return null;
  }

  render() {
    const {activeTab} = this.state;
    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {Object.values(TabCodes).map((tabName) => (
              <li className={`movie-nav__item ${tabName.toLowerCase() === this.state.activeTab ? `movie-nav__item--active` : ``}`}
                key={tabName}
                onClick={(evt) => {
                  evt.preventDefault();
                  this._handleTabClick(tabName);
                }}
              >
                <a href="#" className="movie-nav__link">{tabName}</a>
              </li>
            ))}
          </ul>
        </nav>

        {this._renderTab(activeTab)}

      </div>

    );
  }
}

Tabs.propTypes = {
  movie: PropTypes.shape({}).isRequired,
};
