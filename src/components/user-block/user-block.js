import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {App} from '../app/app';

const UserBlock = (props) => {
  const {authorizationStatus} = props;
  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.NO_AUTH ? <Link className="user-block__link" to={AppRoute.LOGIN}>Sign In</Link>
        : <Link to={AppRoute.LIST}>
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      }
    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

export default UserBlock;
