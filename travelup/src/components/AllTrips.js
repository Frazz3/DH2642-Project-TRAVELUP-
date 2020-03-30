import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getAllTrips } from "../actions/allTripsActions";
import { display } from "@material-ui/system";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

class AllTrips extends React.Component {
  constructor(props) {
    super(props);

    //const currentDate = new Date();
    //const today = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    this.state = {
      allTrips: this.props.allTrips
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userID !== this.props.userID) {
      this.makeAllTrips();
    }
  }

  componentDidMount() {
    if (this.props.userID) {
      this.makeAllTrips();
    }
  }

  makeAllTrips = () => {
    this.props.getAllTrips(this.props.userID);
  };

  handleClick = trip => {
    // Behöver komma till select och MyTrip med specifik trip.
    if (
      window.confirm(
        "\n\nDo you wish to edit this trip to ",
        trip.location,
        "?"
      )
    ) {
      this.props.fetchLocation(trip.location);
      this.props.history.push("/select");
    }
  };

  render() {
    const trips = this.props.allTrips;
    console.log(trips);
    console.log(this.props.userID);
    let i = 0;
    let tripAuthor = "";

    const userTripItems = trips.map(trip => {
      if (trip.author === this.props.userID) {
        tripAuthor = "You";
      } else {
        tripAuthor = trip.author;
      }
      return (
        <Card
          key={trip.id}
          className={styles.root}
          onClick={() => this.handleClick(trip)}
        >
          <CardMedia
            className={styles.media}
            title={trip.location || trip.city}
            image="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1413&q=80"
          ></CardMedia>
          <h2 className={styles.title}>
            {++i}. {trip.location || trip.city}
          </h2>
          <Typography variant={"body2"}>
            This trip to {trip.location || trip.city} has{" "}
            {trip.restaurants.length} restaurant(s) planned!
          </Typography>

          <h6>Author: {tripAuthor}</h6>
        </Card>
      );
    });

    return (
      <Fragment>
        <h1>My trips</h1>
        {userTripItems}
        <Button variant="outlined">
          <Link to="/planner" style={lnkStyle} activeStyle={lnkStyle}>
            {" "}
            Back to Planner{" "}
          </Link>
        </Button>
      </Fragment>
    );
  }
}

const styles = makeStyles(() => ({
  root: {
    overflow: "initial",
    padding: 20,
    maxwidth: 350
  },
  title: {
    textAlign: "left",
    marginBottom: 0
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // Ger 16:19 ratio
    marginTop: 30
  },
  rateValue: {
    fontWeight: "bold",
    marginTop: 2
  },
  content: {
    position: "relative",
    padding: 20,
    margin: "-25% 16px 0",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  favorite: {
    position: "absolute",
    top: 12,
    right: 12
  }
}));

const lnkStyle = {
  color: "black",
  textDecoration: "none",
  position: "left"
};

const mapStateToProps = state => {
  // returns a prop object
  // stateMember: state.stateMember (as mapped in rootreducer)
  return {
    userID: state.firebase.auth.uid,
    allTrips: state.allTrips
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllTrips: userID => dispatch(getAllTrips(userID))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "trips" }]) // Listening to changes in trips collection
)(AllTrips);
