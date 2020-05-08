import React from "react";
import Modal from './Modal'

const Planner = ({
  handleSubmit,
  handleChange,
  newLocation,
  show,
  hideModal,
  dataModal,
  modalType
}) => (
    <React.Fragment>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="destination">Type your Destination: </label>
            <input type="" id="destination" onChange={handleChange} />
          </div>
          <div className="input-field">
            <button className="small_btn" type="submit" >Search</button>
          </div>
          <Modal show={show} onClose={hideModal} data={dataModal} case={modalType} newLoc={newLocation}></Modal>
          <br />
        </form>
      </div>
    </React.Fragment>
  )

export default Planner;
