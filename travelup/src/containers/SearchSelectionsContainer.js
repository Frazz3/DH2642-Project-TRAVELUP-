import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchSelections from "../components/SearchSelections";

class SearchSelectionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location
        }
    }

    goToLink = (link) => {
        // Input format: "/linkString"
        this.props.history.push(link);
    }

    render() {
        //om vi inte är inloggade ska vi inte kunna se planner-sidan
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <SearchSelections
                location={this.props.location}
                locationError={this.props.locationError}
                errorMessage={this.props.errorMessage}
                goToLink={this.goToLink}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        location: state.location.name,
        locationError: state.location.locationError,
        errorMessage: state.location.errorMessage
    }
}

export default connect(mapStateToProps)(SearchSelectionsContainer);
