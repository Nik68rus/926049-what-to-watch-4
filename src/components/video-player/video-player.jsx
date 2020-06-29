import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: this.props.isPlaying,
    };
  }

  componentDidMount() {
    const {src, poster} = this.props;
    const video = this._videoRef.current;

    if (video) {
      video.src = src;
      video.poster = poster;
      video.muted = true;
    }
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
    const {isPlaying} = this.props;

    if (isPlaying) {
      this._playTimeout = setTimeout(() => {
        video.play();
      }, 1000);
    } else {
      video.load();
      clearTimeout(this._playTimeout);
    }
  }

  render() {
    const {src, poster} = this.props;

    return <video
      className="player__video"
      ref={this._videoRef}
      src={src}
      poster={poster}
    />;
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};
