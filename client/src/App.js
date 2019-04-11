import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as AuthService from './services/AuthService';
import * as UserService from './services/UserService';
import { authActions } from './actions/auth'; 
import { fetchUserDetails } from './actions/UserAction';
import Routes from './routes/Routes';
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

class App extends Component {

	componentDidMount() {
		console.log("fetching user details..." , this.props);
		// if SUB (auth0 ID) already exosts in store auth object, then reload user details using it
		const {sub} = this.props.auth.profile;
		if (sub) {this.props.fetchUserDetails(sub)} 
	}

	componentWillMount() {
		//console.log("this.props in app js file : ", this.props);
		const { history, loginError, loginSuccess } = this.props;

		// Add callback for lock's `authenticated` event (listens for authentication events from auth0)
		AuthService.lock.on('authenticated', authResult => {
			console.log("AUTH_RESULT: ", authResult)
			// now take returned access token (authResult.accessToken) and get user profile from auth0
			AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {  // ?? necessary step, all info in authResult.idTokenPayload ??
				if (error) {return loginError(error);}
					else {
						console.log("AUTH_PROFILE: ", profile)
						// save token and profile to local storage 
						AuthService.setToken(authResult.idToken); 
						AuthService.setProfile(profile); 
						// load store with 'auth' object containing: authenticated 'true' and profile 
						loginSuccess(profile);
						// if the returned profile has a SUB (auth0 ID) then use it to fetch the users details from database
						if (profile.sub) {this.props.fetchUserDetails(profile.sub)}
						// if return_location present in localstorage then it is a re-login and use it as location to re-enter app
						const returnLocn = localStorage.getItem("return_location")
						if (returnLocn) {
							history.push({pathname: returnLocn.slice(22)})
							// hide the lock widget
							AuthService.lock.hide();
							// remove the return location from local storage
							localStorage.removeItem("return_location")
						} else {
							// if no return_location, then fresh login and wait 500ms then redirect to appropriate initial page depending on user role
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
								// hide the lock widget
								AuthService.lock.hide();
							}, 500);
						}
					}
			})

			
		});

		// Add callback for lock's `authorization_error` event NOTE NOT WORKING ERROR HANDLING DONE LOCALLY INSTEAD
		AuthService.lock.on('authorization_error', error =>  {
			console.log("AuthError: ", error)
			//load store with 'auth' object containing: authenticated 'false' (no profile)
			loginError(error);
			//redirect to homepage with login options
			history.push({ pathname: '/' })
		}); 
		
		onbeforeunload = e => {
			console.log("component unmounting")
			this.UNSAFE_componentWillMount.saveStore()
		}
	}

	componentWillUnmount() {
		onbeforeunload = null
	}

	saveStore = () => {
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

const mapStateToProps = state => {
	// console.log("state in app.js : ", state);
	return state;
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (App));
