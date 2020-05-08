import React from "react";
import { connect } from 'react-redux';
import { signUp } from '../actions/authActions'
import { Redirect } from "react-router-dom";
import SignupForm from "../components/SignupForm";

class SignupFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault(); //prevent submitting the default values
        this.props.signUp(this.state);
    }


    render() {

        // om vi är inloggad ska vi inte kunna signa up
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/planner' />


        return (
            <SignupForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                authError={this.props.authError}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormContainer);
