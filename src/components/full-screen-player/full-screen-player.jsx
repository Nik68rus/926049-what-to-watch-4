import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getMovies} from '../../reducer/data/selectors';
import {getActiveMovie} from '../../reducer/application/selectors';
import {getMovieIndex} from '../../utils';

class FullScreenPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      progress: 0,
      timeElapsed: 0,
    };

    this._videoRef = createRef();

    this._handlePlayClick = this._handlePlayClick.bind(this);
    this._handleFullScreenClick = this._handleFullScreenClick.bind(this);
    this._handleExitClick = this._handleExitClick.bind(this);
  }

  _handlePlayClick() {
    this.setState({isPlaying: !this.state.isPlaying});
  }

  _handleExitClick() {
    const {history} = this.props;
    history.goBack();
  }

  _handleFullScreenClick() {
    const video = this._videoRef.current;
    video.requestFullscreen();
  }

  _withLeadingZero(number) {
    return number >= 10 ? number : `0${number}`;
  }

  _getElipsedTime(time) {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor((time - hours * 60 * 60) / 60);
    const seconds = Math.floor(time - hours * 60 * 60 - minutes * 60);
    return `${this._withLeadingZero(hours)}:${this._withLeadingZero(minutes)}:${this._withLeadingZero(seconds)}`;
  }

  componentDidMount() {
    const {src, poster} = this.props.movie;
    const video = this._videoRef.current;

    if (video) {
      video.src = src;
      video.poster = poster;
      video.muted = false;

    }

    video.onloadedmetadata = () => this.setState({
      timeElapsed: video.duration,
    });

    video.ontimeupdate = () => this.setState({
      timeElapsed: Math.floor(video.duration - video.currentTime),
      progress: Math.round(Math.floor(video.currentTime) / video.duration * 100),
    });
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    if (video) {
      video.src = ``;
      video.poster = ``;
      video.onplay = null;
      video.muted = null;
    }
  }

  componentDidUpdate() {
    const video = this._videoRef.current;
    const {isPlaying} = this.state;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    const {movie} = this.props;
    const {title, src, preview} = movie;
    const {progress, timeElapsed, isPlaying} = this.state;
    return (
      <div className="player">
        <video src={src} className="player__video" poster={preview} ref={this._videoRef}></video>

        <button type="button" className="player__exit" onClick={this._handleExitClick}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max="100"></progress>
              <div className="player__toggler" style={{left: progress + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{this._getElipsedTime(timeElapsed)}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={this._handlePlayClick}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={isPlaying ? `#pause` : `#play-s`}></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{title}</div>

            <button type="button" className="player__full-screen" onClick={this._handleFullScreenClick}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FullScreenPlayer.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movie: getMovies(state)[getMovieIndex(getMovies(state), getActiveMovie(state))],
});

export {FullScreenPlayer};
export default connect(mapStateToProps)(FullScreenPlayer);
