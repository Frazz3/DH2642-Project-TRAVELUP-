import React from "react";
import { connect } from 'react-redux';
import { signIn } from '../actions/authActions'
import { Redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";

class LoginFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault(); //prevent submitting the default values

        this.props.signIn(this.state); //this.state is the credentials (email and password) from the state of the class
    }

    render() {
        const { authError, auth } = this.props;

        //want to redirect to the planner if we are logged in
        if (auth.uid) return <Redirect to='/planner' />

        return (
            <LoginForm
                authError={authError}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
            />)
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
