import React, {PureComponent, Fragment} from 'react';

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
};
