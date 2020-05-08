import React from "react";
import { Checkbox, FormGroup, FormControlLabel, FormLabel, } from '@material-ui/core';
import PropTypes from "prop-types";
import Modal from './Modal'

const BrowseFood = ({
  restaurants,
  addRestaurant,
  handleClick,
  handleChange,
  returnToBrowse,
  foodError,
  getModal,
  hideModal,
  show,
  dataModal,
  modalType,
  mealTypesCheckbox,
  priceCheckbox
}) => (
    <div className="container">
      <section className="containerSection" > {/* behövs detta?  */}
        <div class="row">

          <div className="filter_div" class="col col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12">
            <div>
              <FormLabel component="legend">Price</FormLabel>
              <div>{priceCheckbox}</div>
              <br />
              <FormLabel component="legend">Meal type</FormLabel>
              <div>{mealTypesCheckbox}</div>
            </div>

            <div>
              <button className="small_btn" variant="outlined" onClick={handleClick}>
                Filter
              </button>
            </div>
          </div>

          <div className="restaurantDiv" class="col col-xl-10 col-lg-10">

            <h1 className="title_text" > <button className="arrow_btn" onClick={() => returnToBrowse()} >&#8592;</button> Restaurants</h1>

            {foodError ? (
              <div>
                <span className="error_text">Could not find any restaurants</span>
              </div>
            ) : ((restaurants.length === 0) ? (       // vid varje ny fetch så blir restaurants reset till [], och då kör spinner (borde gå att lösa snyggare dock...)
              <div>{spinner()}</div>
            ) : restaurantItems(restaurants, getModal))}
          </div>
          <Modal show={show} onClose={hideModal} data={dataModal} case={modalType} onAdd={() => { let modRest = dataModal; addRestaurant(modRest) }}></Modal>
        </div>
      </section>
    </div>
  )

const restaurantItems = (restaurants, getModal) => {
  let items = restaurants.map(restaurant => {
    //const restaurantItems = restaurants_list.map(restaurant => {
    return ((restaurant.name && restaurant.photo) ?  // kan behöva fler att filtrera på
      (
        <span key={restaurant.location_id}>
          <button className="result_btn" onClick={() => { getModal(restaurant, "b") }}>
            <h4>{restaurant.name} </h4>
            <img src={restaurant.photo.images.small.url} />
            <h5>Price Range: {restaurant.price} </h5>
            <p>Address: {restaurant.address} </p>
          </button>
        </span>

      ) : null)
  });
  return items;
}

const spinner = () => {
  return (
    <div className="spinner" key="spinner">
      <img src="http://www.csc.kth.se/~cristi/loading.gif"></img>
    </div>
  )
}

BrowseFood.propTypes = {
  restaurants: PropTypes.array.isRequired,
  addRestauranti: PropTypes.func.isRequired
}

export default BrowseFood;