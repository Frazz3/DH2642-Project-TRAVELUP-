import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

const AllTrips = ({
  trips,
  deleteTrip,
  editTrip,
  getModal,
  hideModal,
  show,
  dataModal,
  modalType
}) => (
    <React.Fragment>
      <div>
        <h1 className="title_text">My trips</h1>
      </div>
      {trips.map(trip => {
        return (
          <div key={trip.id} className="all_trips">
            <button
              className="delete_btn"
              onClick={() => {
                getModal(trip.id, "delete");
              }}
            >
              X
        </button>
            <button
              className="delete_btn"
              onClick={() => {
                getModal(trip.id, "edit");
              }}
            >
              ...
        </button>
            <h2 className="large_text">
              {trip.location}
            </h2>
            <img className="all_trips_img" src={trip.locationPhoto} />
            <h5 className="medium_text">Restaurants</h5>
            {trip.restaurants
              ? trip.restaurants.map(rest => (
                <h6
                  key={rest.id}
                  className="small_text"
                  onClick={() => getModal(rest, "o")}
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
                  onClick={() => getModal(act, "o")}
                >
                  {" "}
                  {act.name}{" "}
                </h6>
              ))
              : null}
            <h5 className="medium_text">Accommodation</h5>
            {trip.accommodations
              ? trip.accommodations.map(acc => (
                <h6
                  key={acc.id}
                  className="small_text"
                  onClick={() => getModal(acc, "n")}
                >
                  {" "}
                  {acc.name}{" "}
                </h6>
              ))
              : null}
            <h6>-------------</h6>
            <Modal
              show={show}
              onClose={hideModal}
              data={dataModal}
              case={modalType}
              edit={() => editTrip(dataModal)}
              delete={() => deleteTrip(dataModal)}
            ></Modal>
          </div>
        )
      })}
    </React.Fragment>
  );

AllTrips.propTypes = {
  trips: PropTypes.array.isRequired,
  deleteTrip: PropTypes.func.isRequired,
  editTrip: PropTypes.func.isRequired,
  getModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  dataModal: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired
};

export default AllTrips;
