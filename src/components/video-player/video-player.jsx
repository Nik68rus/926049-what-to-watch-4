import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';

export default class VideoPlayer extends PureComponent {

  render() {
    const {children} = this.props;

    return (<Fragment>
      {children}
    </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
