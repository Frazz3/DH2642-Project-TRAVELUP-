import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles, ButtonBase, Typography } from '@material-ui/core';
import SearchSelections from "../components/SearchSelections";


class SearchSelectionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location
        }

    }

    returnToPlanner = () => {
        this.props.history.push("/planner")
    }

    render() {
        //om vi inte är inloggade ska vi inte kunna se planner-sidan
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        console.log("LOC: ", this.state.location);
        console.log("LocErr: ", this.state.locationError);
        console.log("ErrMsg: ", this.state.errorMessage);

        return (
            <SearchSelections
                location={this.props.location}
                locationError={this.props.locationError}
                errorMessage={this.props.errorMessage}
                returnToPlanner={this.returnToPlanner}
                history={this.props.history}
            />
        )
    }
}

const mapStateToProps = (state) => {
    // skulle vilja lägga in location innan man går vidare... nu tar fetchen tid så location kommer inte upp när man rendrar
    console.log(state.location.name)
    return {
        auth: state.firebase.auth,
        location: state.location.name,
        locationError: state.location.locationError,
        errorMessage: state.location.errorMessage
    }
}

export default connect(mapStateToProps)(SearchSelectionsContainer);
