// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getToken,
  getProfile,
  getTryToLoadToken,
  getLoginStatus,
} from '../../selectors/authSelector';

const mapStateToProps = createStructuredSelector({
  token: getToken,
  profile: getProfile,
  tryToLoadToken: getTryToLoadToken,
  loginStatus: getLoginStatus,
});

export default connect(
  mapStateToProps,
);
