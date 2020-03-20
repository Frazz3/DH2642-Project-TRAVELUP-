import React from "react";
import { connect } from "react-redux";
import {getAllTrips} from '../actions/allTripsActions'

class AllTrips extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
          
      }
  
    }

makeAllTrips = () => {
    this.props.getAllTrips(this.props.userID)
}

    render() {
        console.log('id', this.props.userID)
        if(this.props.userID){
            this.makeAllTrips()
            console.log('have user id', this.props.userID)
        }
        
        //this.props.getAllTrips(this.props.userID)
        //this.makeAllTrips()
        //this.makeAllTrips
        return (
        <div>All Trips</div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
      userID: state.firebase.auth.uid
    }
  }

const mapDispatchToProps = (dispatch) => {
    return{
        getAllTrips: (userID) => dispatch(getAllTrips(userID))  //createTrip is an action-creator
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTrips);