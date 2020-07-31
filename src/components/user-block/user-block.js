import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../reducer/user/user';

const UserBlock = (props) => {
  const {authorizationStatus} = props;
  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.NO_AUTH ? <a className="small-movie-card__link" href="#">Sign In</a> : <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>}
    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

export default UserBlock;
