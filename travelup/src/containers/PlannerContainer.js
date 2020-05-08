import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchLocation } from "../actions/plannerActions";
import { resetTrip } from "../actions/tripActions";
import { resetLocation } from "../actions/plannerActions"
import Planner from "../components/Planner";

class PlannerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destination: '',
            show: false,
            dataModal: {},
            modalType: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleClick = () => {
        this.props.signOut();
    }

    handleSubmit(e) {
        e.preventDefault(); //prevent submitting the default values
        if (this.props.location.id !== null) {
            this.getModal(this.state.destination, "new")
        } else {
            this.newLocation();
        }
    }

    hideModal = () => {
        this.setState({
            show: false
        })
    }

    getModal = (data, type) => {
        this.setState({
            show: true,
            dataModal: data,
            modalType: type
        })
    }

    newLocation = () => {
        //reset trip and location
        this.props.resetLocation();
        this.props.resetTrip();
        this.props.fetchLocation(this.state.destination) // Vill inte pusha innan fetch är färdig...
        this.props.history.push('/select');
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />

        return (
            <Planner
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                newLocation={this.newLocation}
                show={this.state.show}
                hideModal={this.hideModal}
                dataModal={this.state.dataModal}
                modalType={this.state.modalType}
            />
        )

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        location: state.location,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocation: (destination) => dispatch(fetchLocation(destination)),
        resetTrip: () => dispatch(resetTrip()),
        resetLocation: () => dispatch(resetLocation())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlannerContainer);
