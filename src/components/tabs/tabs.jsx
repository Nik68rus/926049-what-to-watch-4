import React, {PureComponent} from 'react';
import PropTypes, {array} from 'prop-types';
import {TabCodes} from '../../constants';
import MovieOverview from '../movie-overview/movie-overview.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';
import MovieReviews from '../movie-reviews/movie-reviews.jsx';

class Tabs extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderTab(tab) {
    switch (tab) {
      case TabCodes.OVERVIEW.toLowerCase():
        return <MovieOverview movie={this.props.movie} />;
      case TabCodes.DETAILS.toLowerCase():
        return <MovieDetails movie={this.props.movie} />;
      case TabCodes.REVIEWS.toLocaleLowerCase():
        return <MovieReviews comments={this.props.comments} />;
    }

    return null;
  }

  render() {
    const {activeTab, onTabClick} = this.props;
    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {Object.values(TabCodes).map((tabName) => (
              <li className={`movie-nav__item ${tabName.toLowerCase() === activeTab ? `movie-nav__item--active` : ``}`}
                key={tabName}
                onClick={(evt) => {
                  evt.preventDefault();
                  onTabClick(tabName);
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
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  comments: array.isRequired,
};

export default Tabs;
