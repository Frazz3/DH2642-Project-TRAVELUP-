import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Modal from './Modal'

const MyTrip = ({
  location,
  restaurants,
  activities,
  accommodations,
  removeRestaurantFromList,
  removeActivityFromList,
  removeAccommodationFromList,
  handleClick,
  discardTrip,
  getModal,
  hideModal,
  show,
  dataModal,
  modalType
}) => (
    <React.Fragment>
      {
        <div className="myTrip_container">
          <br />
          <div><b>My trip to {location}</b></div>
          <div>Restaurants: </div>
          <div>
            {
              restaurants ? restaurants.map(rest => {
                return (
                  <div>
                    <div key={rest.location_id} className="myTrip_text" onClick={() => getModal(rest, "o")}>
                      - {rest.name}</div>
                    <div className="myTrip_text">
                      <button className="element_delete_btn" onClick={() => removeRestaurantFromList(rest)}>x</button>
                    </div>
                  </div>
                )
              }) : null
            }
          </div>
          <div>Activities: </div>
          <div>
            {
              activities ? activities.map((act) => {
                return (
                  <div><div key={act.location_id} className="myTrip_text" onClick={() => getModal(act, "o")}>
                    - {act.name}</div>
                    <div className="myTrip_text"><button className="element_delete_btn" onClick={() => removeActivityFromList(act)}>x</button>
                    </div></div>
                )
              }) : null
            }
          </div>
          <div>Accommodations: </div>
          <div>
            {
              accommodations ? accommodations.map((acc) => {
                return (
                  <div><div key={acc.location_id} className="myTrip_text" onClick={() => getModal(acc, "o")}>
                    - {acc.name}</div>
                    <div className="myTrip_text"><button className="element_delete_btn" onClick={() => removeAccommodationFromList(acc)}>x</button>
                    </div></div>
                )
              }) : null
            }
          </div>
          <Link to="/allTrips">
            <button className="small_btn" variant="outlined" onClick={handleClick}>
              Add trip
    </button>
          </Link>
          <Link to="/planner">
            <button className="small_btn" variant="outlined" onClick={discardTrip}>
              Discard trip
    </button>
          </Link>

          <Modal show={show} onClose={hideModal} data={dataModal} case={modalType}></Modal>

        </div>
      }
    </React.Fragment>
  )

MyTrip.propTypes = {
  location: PropTypes.string,
  restaurants: PropTypes.array,
  activities: PropTypes.array,
  accommodations: PropTypes.array,
  removeRestaurantFromList: PropTypes.func.isRequired,
  removeActivityFromList: PropTypes.func.isRequired,
  removeAccommodationFromList: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  discardTrip: PropTypes.func.isRequired,
  getModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  dataModal: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired
};


export default MyTrip;