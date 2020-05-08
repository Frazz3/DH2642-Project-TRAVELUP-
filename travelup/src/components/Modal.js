import React from "react";

export default class Modal extends React.Component {

  render() {
    if (!this.props.show) {
      return null;
    }

    let modalDiv;
    let message;
    let title = "";
    let photo;
    let buttons;
    let website = "";
    let onClickFunc;
    let price="";

    if (this.props.case === "o" || this.props.case === "b") {
      message = this.props.data.description;
      title = this.props.data.name;
      price = this.props.data.price;
      if (this.props.data.website) {
        website = "Click here to find out more"
      }

      if (this.props.case === "b") {
        photo = this.props.data.photo.images.small.url
        buttons = (<div><button className="modal_btn" variant="outlined" onClick={this.props.onAdd}>Add to trip</button>
          <button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>);
      } else {
        photo = this.props.data.photo;
        buttons = (<div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>);
      }
    }

    else if (this.props.case === "c" || this.props.case === "finish") {
      if (this.props.case === "c") {
        message = this.props.data.name + " has already been added to your trip";
      }
      else {
        message = "You must save your current trip before you start editing another one!"
      }
      title = "Note!"
      buttons = (<div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Ok</button></div>)
    }
    else if (this.props.case === "delete" || this.props.case === "edit" || this.props.case === "new") {
      if (this.props.case === "delete") {
        title = "Delete Trip"
        onClickFunc = this.props.delete;
        message = "Do you want to delete this trip?"
      }
      else if (this.props.case === "edit") {
        title = "Edit Trip"
        onClickFunc = this.props.edit;
        message = "Do you want to edit this trip?"
      }
      else {
        title = "Change location"
        onClickFunc = this.props.newLoc;
        message = "Do you really want to change your trip destination? This will discard your current trip."
      }
      buttons = (<div><button className="modal_btn" variant="outlined" onClick={onClickFunc}>Yes</button>
        <button className="modal_btn" variant="outlined" onClick={this.props.onClose}>No</button></div>)
      //title = "Warning"
    }
    modalDiv = (
      <div>
        <div className="modal_title">{title}</div>
        <img src={photo} alt=""/>
        <div className="modal_text">{message}</div>
        <div className="price_text">{price}</div>
        <p><a href={this.props.data.website}>{website}</a></p>
        {buttons}
      </div>
    )

    return (
      <div className="modalStyle">
        {modalDiv}
        <div>
        </div>
      </div>
    );
  }
}
