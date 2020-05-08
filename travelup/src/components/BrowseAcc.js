import React from "react";
import { FormLabel } from '@material-ui/core';
import PropTypes from "prop-types";
import spinner from "../util";
import Modal from './Modal';

const BrowseAcc = ({
  accommodations,
  addAccommodation,
  accError,
  handleClick,
  returnToBrowse,
  getModal,
  hideModal,
  show,
  dataModal,
  modalType,
  amenitiesCheckbox
}) => (
    <div className="container">
      <section className="containerSection">
        <div class="row">

          <div className="filter_div" class="col col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12" >
            <div>
              <FormLabel component="legend">Amenities</FormLabel>
              <div>{amenitiesCheckbox}</div>
            </div>

            <div>
              <button className="small_btn" variant="outlined" onClick={handleClick}>
                Filter
                </button>

            </div>
          </div>
          <div className="accommodationDiv" class="col col-xl-10 col-lg-10">
            <h1 className="title_text" > <button className="arrow_btn" onClick={() => returnToBrowse()} >&#8592;</button> Accommodations</h1>
            {accError ? (
              <div>
                <span className="error_text">Could not find any accommodations</span>
              </div>
            ) : (
                (accommodations.length === 0) ? (       // vid varje ny fetch så blir restaurants reset till [], och då kör spinner (borde gå att lösa snyggare dock...)
                  <div>{spinner()}</div>
                ) : accItems(accommodations, getModal))}
          </div>
          <Modal show={show} onClose={hideModal} data={dataModal} case={modalType} onAdd={() => { let modRest = dataModal; addAccommodation(modRest) }}></Modal>
        </div>
      </section>
    </div>
  )


const accItems = (accommodations, getModal) => {
  let items = accommodations.map(acc => {

    return ((acc.name && acc.photo) ?  // kan behöva fler att filtrera på
      (
        <span key={acc.location_id}>
          <button className="result_btn" onClick={() => { getModal(acc, "b") }} >
            <h4>{acc.name} </h4>
            <img src={acc.photo.images.small.url} alt=""/>
            <h5>Price Range: {acc.price} </h5>
            {/* <p>Neighborhood: {acc.neighborhood_info.name} </p> */}
            <p>Type: {acc.subcategory_type_label}</p>
          </button>
        </span>

      ) : null)
  });
  return items;
}

BrowseAcc.propTypes = {
  accommodations: PropTypes.array.isRequired,
  addAccommodation: PropTypes.func.isRequired
}

export default BrowseAcc;