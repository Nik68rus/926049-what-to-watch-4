import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Link} from 'react-router-dom';
import {AppRoute, HOST} from '../../constants';
import {App} from '../app/app';
import {connect} from 'react-redux';
import {getAuthStatus, getUser} from '../../reducer/user/selectors';

const UserBlock = (props) => {
  const {authorizationStatus, user} = props;
  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.NO_AUTH ? <Link className="user-block__link" to={AppRoute.LOGIN}>Sign In</Link>
        : <Link to={AppRoute.LIST}>
          <div className="user-block__avatar">
            <img src={`${HOST}${user.avatar_url}`} alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      }
    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  user: getUser(state),
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);
