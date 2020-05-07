import React from "react";
import PropTypes from "prop-types";

const AllTrips = ({
  trips,
  deleteTrip,
  editTrip,
  showRestaurant,
  showActivity
}) => (
  <React.Fragment>
    {
      <div>
        <h1 className="title_text">My trips</h1>
      </div>
    }
    {trips.map(trip => {
      return (
        <div key={trip.id} className="all_trips">
          <button className="delete_btn" onClick={() => deleteTrip(trip.id)}>
            X
          </button>
          <button className="delete_btn" onClick={() => editTrip(trip.id)}>
            ...
          </button>
          <img className="all_trips_img" src={trip.locationPhoto} />
          <h5 className="medium_text">Restaurants</h5>
          {trip.restaurants
            ? trip.restaurants.map(rest => (
                <h6
                  key={rest.id}
                  className="small_text"
                  onClick={() => showRestaurant(rest)}
                >
                  {" "}
                  {rest.name}{" "}
                </h6>
              ))
            : null}
          <h5 className="medium_text">Activities</h5>
          {trip.activities
            ? trip.activities.map(act => (
                <h6
                  key={act.id}
                  className="small_text"
                  onClick={() => showActivity(act)}
                >
                  {" "}
                  {act.name}{" "}
                </h6>
              ))
            : null}
          <h6>-------------</h6>
        </div>
      );
    })}
  </React.Fragment>
);

// AllTrips.propTypes = {
//   trips: PropTypes.array.isRequired,
//   deleteTrip: PropTypes.func.isRequired,
//   editTrip: PropTypes.func.isRequired
// };

export default AllTrips;
