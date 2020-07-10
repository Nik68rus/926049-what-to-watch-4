import React, {PureComponent} from 'react';

const withPlayStatus = (Component) => {
  class WithPlayStatus extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
      this.setState((prevState) => ({prevState, isPlaying: true}));
    }

    handleMouseLeave() {
      this.setState((prevState) => ({prevState, isPlaying: false}));
    }

    render() {
      const {isPlaying} = this.state;
      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      );
    }

  }

  return WithPlayStatus;
};

export default withPlayStatus;
