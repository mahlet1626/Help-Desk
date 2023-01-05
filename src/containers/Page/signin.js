import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appAction from "../../redux/app/actions";
import actions from "../../redux/users/actions";
import Auth0 from "../../helpers/auth0";
import Firebase from "../../helpers/firebase";
import FirebaseLogin from "../../components/firebase";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
// import { toast } from "react-toastify";
import { notification } from "antd";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'

// import app from "../../firebase.js";
const { checkUserPermission } = actions;
const { login } = authAction;
const { clearMenu } = appAction;
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Logged in Successfully",
    description:
      "Welcome Admin",
  });
};
const openErrorNotificationWithIcon = (type) => {
  notification[type]({
    message: "Error",
    description: "User Not Allowed",
  });
};
class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    email: "",
    password: "",
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.errorMessage == "Not_Allowed") {
      openErrorNotificationWithIcon("error")
      localStorage.removeItem('id_token', 'user_id');
      // this.setState({ redirectToReferrer: true });
    }
    else if (nextProps.userPermission == "Admin" || nextProps.userPermission == "Dispatcher") {
      openNotificationWithIcon("info")
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = async () => {
    console.log("Auth Start");
    //const auth = getAuth();

    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user && user.email) {
          const { login, clearMenu } = this.props;
          this.props.checkUserPermission(user.uid)
          // localStorage.setItem("user_id", user.uid);
          login();
          clearMenu();
          // openNotificationWithIcon("info")
          // this.props.history.push("/dashboard");
          // this.props.history.push("/dashboard");
        }
        console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        openErrorNotificationWithIcon("error")
      });

    clearMenu();
    // console.log(this.props)
  };
  render() {

    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      console.log("was here")
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="ADMIN" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Username"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p>
              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>
                {Auth0.isValid && (
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signInAuth0" />
                  </Button>
                )}
                {Firebase.isValid && <FirebaseLogin login={this.handleLogin} />}
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  (state) => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    ...state.Users,
  }),
  { login, clearMenu, checkUserPermission }
)(SignIn);