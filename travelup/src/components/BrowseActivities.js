import React from "react";
import { Checkbox, FormGroup, FormControl, FormControlLabel, FormLabel, Button, Radio, RadioGroup } from '@material-ui/core';
import PropTypes from "prop-types";
import spinner from "../util";
import Modal from './Modal';

const BrowseActivities = ({
  activities,
  addActivity,
  category,
  activity_subcategories,
  activityError,
  handleClick,
  handleChange,
  returnToBrowse,
  getModal,
  hideModal,
  show,
  dataModal,
  modalType
}) => (
  <div className="container">
  <section className="containerSection">
  <div class="row">

    <div className="filter_div" class="col col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12">
      <div>
          <FormControl>
          <FormLabel component="legend">Category</FormLabel>
            <div>{categoryRadio(activity_subcategories, handleChange, category)}</div>

      <button className="small_btn" variant="outlined" onClick={handleClick}>
        Filter
      </button>
          </FormControl>
    </div>
    </div>
    <div className="activityDiv" class="col col-xl-10 col-lg-10">
      <h1 className="title_text" > <button className="arrow_btn" onClick={() => returnToBrowse()} >&#8592;</button> Activities</h1>
      { activityError?(
        <div>
          <span className="error_text">Could not find any activities</span>
        </div>
        ):(
          (activities.length === 0)? (       // vid varje ny fetch så blir activitys reset till [], och då kör spinner (borde gå att lösa snyggare dock...)
        <div>{spinner()}</div>
      ) : activityItems(activities, getModal))}
    </div>
    <Modal show={show} onClose={hideModal} data={dataModal} case={modalType} onAdd={()=> {let modRest = dataModal; addActivity(modRest)}}></Modal>
  </div>
  </section>
  </div>
)

const activityItems = (activities, getModal) => {
 let items = activities.map(activity => {
   return ((activity.name && activity.photo )?  // kan behöva fler att filtrera på
    (
      <span key={activity.location_id}>
        <button className="result_btn" onClick={()=> {getModal(activity,"b")}}>
          <h4>{activity.name} </h4>
          <img src={activity.photo.images.small.url}/>
          //<h5>Price Range: {activity.price} </h5>
          <p>Address: {activity.address} </p>
        </button>
      </span>

  ):null)});
  return items;
}

const createRadio = (label, stateName, code, category) => {
    return(
      <FormControlLabel value={code} control={<Radio checked={category === code}/>} label={label} />
    )
  }

const categoryRadio = (activity_subcategories, handleChange, category) => {
  return(
  <FormControl component="fieldset">
    <RadioGroup onChange={handleChange}>
      {activity_subcategories.map(sub_cat=>{return createRadio(sub_cat.label,sub_cat.state, sub_cat.code, category)})}
    </RadioGroup>
  </FormControl>
  )
  };

BrowseActivities.propTypes = {
  activities: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired
}

export default BrowseActivities;