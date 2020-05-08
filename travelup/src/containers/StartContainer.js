import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Start from "../components/Start";

class StartContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            action: null
        }
    }

    handleClickLogin = () => {
        this.setState({
            action: 'login'
        })
    }

    handleClickSignUp = () => {
        this.setState({
            action: 'signup'
        })
    }

    render() {
        // om vi är inloggade ska vi inte kunna gå tillbaka till start-sidan
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/planner' />

        if (this.state.action) {
            if (this.state.action === 'login') {
                return <Redirect to='/logIn' />
            }
            if (this.state.action === 'signup') {
                return <Redirect to='/signUp' />
            }
        }

        return (
            <Start
                handleClickLogin={this.handleClickLogin}
                handleClickSignUp={this.handleClickSignUp}
            />
        )


    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(StartContainer);
