import React from "react";
import PropTypes from k
import { connect } from "react-redux";

class MyTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        location: this.props.location,
        activites: this.props.activities
    }

  }

  render() {
    return <div> TRIP </div>;
  }
}

const mapStateToProps = state => {
    return {
    location: state.location, // eventuellt state.location.location
    activities: state.activities
}}

const mapDispatchToProps = dispatch => ({
    setLocation: location => {
        dispatch(setLocation(location))
    },
    addActivity: activity => {
        dispatch(addActivity(activity))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTrip);