import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import { isEmpty } from 'lodash/isEmpty'
import PropTypes from 'prop-types';
import * as AuthService from './services/AuthService';
import * as UserService from './services/UserService';
import * as LocalStorage from './localStorage';
import { authActions } from './actions/auth'; 
import { fetchUserDetails } from './actions/UserAction';
import Routes from './routes/Routes';
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

class App extends Component {

	componentDidMount() {
		//console.log("this.props in app js file : ", this.props);
		const { history, loginSuccess, loginError } = this.props;

		// Add callback for lock's `authenticated` event (listens for authentication events from auth0)
		AuthService.lock.on('authenticated', authResult => {
			console.log("AUTH_RESULT: ", authResult)

			// check authResult return a user, if not redirect to 'notAuthenticated view'
			if (!authResult) {
				history.push({ pathname: '/notAuthenticated' }) 
			} else {
				const authProfile = authResult.idTokenPayload
				if (!authProfile) {
					history.push({ pathname: '/notAuthenticated' }) 
				} else {
					const emailVerified = authProfile.email_verified
					const pwdType = authProfile[`http://engageyu-dev.auth0.com_user_metadata`].password
					const id = authProfile.sub

					// check user email ? present and verified
					if (emailVerified === (undefined || null)) {
						history.push({ pathname: '/notAuthenticated' }) 
					} else if (emailVerified === false) {
						this.emailNotVerified();
					} else {
						// check user password type ? if temporary -> force password update
						if (pwdType === (undefined || null)) {
							history.push({ pathname: '/notAuthenticated' }) 
						} else if (pwdType === "temp") {
							history.push({ 
								pathname: '/TempPwdChange',
								state: { id }
							})
						} else {
							// if email verified and password valid -> log user in 
							// 1.save auth tokens to local storage
							const accessToken = authResult.accessToken
							const idToken = authResult.idToken
							const authProfile = authResult.idTokenPayload
							const userId = authProfile.sub
							const profile = {
								email: authProfile.email,
								exp: authProfile.exp,
								full_name: authProfile[`http://engageyu-dev.auth0.com_user_metadata`].full_name,
								picture: authProfile.picture,
								auth_user_id: authProfile.sub
							}
							AuthService.setIdToken(idToken)
							AuthService.setAccessToken(accessToken)
							AuthService.setProfile(profile)
							UserService.setUserId(userId)

							// 2.fetch user info from app db user collection and save to local storage 
							this.props.fetchUserDetails(userId) 

							// 3.load store with 'auth' object containing: authenticated 'true' and profile 
							loginSuccess(profile);

							// 4.redirect to appropriate page post login
							// if return_location specified -> re-login and redirect back to previous page
							const returnLocn = localStorage.getItem("return_location")
							if (returnLocn) {
								history.push({pathname: returnLocn.slice(22)})
								LocalStorage.clearReturnLocation();
							} else {
								// if no return_location specified -> fresh login + rediect dependant on userRole
								setTimeout(() => {
									console.log("User role: ", UserService.getUserRole())
									switch (UserService.getUserRole()) {
										case 'patient':
											history.push({ pathname: '/' })
											break;
										case 'provider':
											history.push({ pathname: '/admin/dashboard' })
											break;
										case 'admin':
											history.push({ pathname: '/admin/dashboard' })
											break;
										case 'super':
											history.push({ pathname: '/admin/dashboard' })
											break;
										default: history.push({ pathname: '/' }); break;
									}
									
								}, 500);
							}
							// hide the lock widget
							AuthService.lock.hide();
						}
					}
				}
			}
		})

		// Add callback for lock's `authorization_error` event NOTE NOT WORKING ERROR HANDLING DONE LOCALLY INSTEAD
		AuthService.lock.on('authorization_error', error =>  {
			console.log("AuthError: ", error)
			//load store with 'auth' object containing: authenticated 'false' (no profile)
			this.props.loginError(error);
			//redirect to homepage with login options
			this.props.history.push({ pathname: '/' })
		});
	}

	emailNotVerified = () => {
		console.log("Email ot verified")
		this.props.history.push({ pathname: '/emailnotverified' });
	}

	pwdTempChange = () => {
		console.log("temporary password change")
		this.props.history.push({ pathname: '/temppwdchange'})
	}


	// Component render
	render() {
		return (
			<MuiThemeProvider theme={theme} >
				<Routes {...this.props} />
			</MuiThemeProvider>
		);
	}

	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func.isRequired
		}).isRequired,
		loginError: PropTypes.func.isRequired,
		loginSuccess: PropTypes.func.isRequired,
		fetchUserDetails : PropTypes.func.isRequired, 
	};
}

const mapDispatchToProps = dispatch => ({
	loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
	loginError: error => dispatch(authActions.loginError(error)), 
	fetchUserDetails : id => dispatch(fetchUserDetails(id)),
});


const mapStateToProps = (state) => {
	console.log("state in app.js : ", state);
	return {
		user: state.user.user,
		error: state.user.error
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));

