import React from "react";
import { Button } from '@material-ui/core';

export default class Modal extends React.Component {


  render() {
    if (!this.props.show) {
      return null;
    }

    let modalDiv;
    let message;
    let title;
    let photo; 
    let buttons; 
    let website = "";
    let onClickFunc;

    if (this.props.case === "o" || this.props.case === "b"){
      message = this.props.data.description;
      title = this.props.data.name;
      if(this.props.data.website){
        website = "Click here to find out more"
      }

      if(this.props.case === "b"){
        photo= this.props.data.photo.images.small.url
        buttons = (<div><button className="modal_btn" variant="outlined" onClick={this.props.onAdd}>Add to trip</button>
      <button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>);
      }else{
        photo = this.props.data.photo;
        buttons = (<div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>);
      }
    }
   
    else if(this.props.case === "c" || this.props.case === "finnish"){
      if(this.props.case === "c"){
        message = "You have already added " + this.props.data.name + " to your trip, choose another one please";
      }
      else{
        message="You have already started on a trip, you need to finish that one before you can edit this."
      }
      title = "Note!"
      buttons = (<div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Ok</button></div>)
    }
    else if(this.props.case === "delete" || this.props.case === "edit" || this.props.case === "new"){
      if(this.props.case === "delete"){
        title = "Delete Trip"
        onClickFunc = this.props.delete; 
        message = "Do you want to delete this trip?"
      }
      else if(this.props.case === "edit"){
        title = "Edit Trip"
        onClickFunc = this.props.edit;
        message="Do you want to edit this trip?"
      }
      else{
        title = "Change location"
        onClickFunc = this.props.newLoc;
        message= "Do you really want to change you location? You current trip will be deleted in that case."
      }
      buttons = (<div><button className="modal_btn" variant="outlined" onClick={onClickFunc}>Yes</button>
      <button className="modal_btn" variant="outlined" onClick={this.props.onClose}>No</button></div>)
      title = "Warning"
    }
    modalDiv = (
      <div>
        <div className="modal_title">{title}</div>
        <img src={photo}/>
        <div className="modal_text">{message}</div>
        <div className="price_text">{this.props.data.price}</div>
        <p><a href={this.props.data.website}>{website}</a></p>
        {buttons}
      </div>
    )


    return (
      <div className="modall">
        {modalDiv}
        <div>
        </div>
      </div>
    );
  }
}
