import React, {PureComponent} from 'react';
import {TabCodes} from '../../constants';

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TabCodes.OVERVIEW.toLowerCase(),
      };

      this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(name) {
      this.setState({activeTab: name.toLowerCase()});
    }

    render() {
      const {activeTab} = this.state;
      return (
        <Component
          {...this.props}
          activeTab={activeTab}
          onTabClick={this.handleTabClick}
        />
      );

    }
  }

  return WithActiveTab;
};

export default withActiveTab;
