import React from "react";
import { Button} from '@material-ui/core';

export default class Modal extends React.Component {
    

// onClose = e => {
//     this.props.onClose && this.props.onClose(e);
//     };

  render() {
    console.log(this.props.show)
    console.log(this.props.data)
    console.log(this.props.case)
    if (!this.props.show) {
      return null;
    }

    let website = ""
    if(this.props.data.website){
        website = "Click here to find out more"
    }

    let modalDiv;
    if(this.props.case === "o"){
        modalDiv = (
            <div>
            <div className="modal_title">{this.props.data.name}</div>
              <img src={this.props.data.photo}/>
              <div className="modal_text">{this.props.data.description}</div>
              <div className="price_text">{this.props.data.price}</div>
              <p><a href={this.props.data.website}>{website}</a></p>
              <div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>
              </div>
            );
    } else if(this.props.case === "b"){
        modalDiv = (<div>
            <div className="modal_title">{this.props.data.name}</div>
              <img src={this.props.data.photo.images.small.url}/>
              <div className="modal_text">{this.props.data.description}</div>
              <div className="price_text">{this.props.data.price}</div>
              <p><a href={this.props.data.website}>{website}</a></p>
              <div><button className="modal_btn" variant="outlined" onClick={this.props.onAdd}>Add to trip</button><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>
              </div>)
    }else if(this.props.case === "c"){
        modalDiv = (<div>
            <div className="modal_text">You have already added {this.props.data.name} to your trip, choose another one please</div>
            <div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Ok</button></div>
            </div>)
    }else if(this.props.case === "delete"){
        modalDiv = (<div>
            <div className="modal_text">Do you want to delete this trip?</div>
            <div><button className="modal_btn" variant="outlined" onClick={this.props.delete}>Yes</button>
            <button className="modal_btn" variant="outlined" onClick={this.props.onClose}>No</button></div>
            </div>)
    }else if(this.props.case === "edit"){
        modalDiv = (<div>
            <div className="modal_text">Do you really want to edit this trip?</div>
            <div><button className="modal_btn" variant="outlined" onClick={this.props.edit}>Yes</button>
            <button className="modal_btn" variant="outlined" onClick={this.props.onClose}>No</button></div>
            </div>)
    }else if(this.props.case === "new"){
        modalDiv = (<div>
            <div className="modal_text">Do you really want to change you location? You current trip will be deleted in that case.</div>
            <div><button className="modal_btn" variant="outlined" onClick={this.props.newLoc}>Yes</button>
            <button className="modal_btn" variant="outlined" onClick={this.props.onClose}>No</button></div>
            </div>)
    }else if(this.props.case === "finnish"){
        modalDiv = (<div>
            <div className="modal_text">You have already started on a trip, you need to finish that one before you can edit this.</div>
            <div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Ok</button></div>
            </div>)
    } else{
        modalDiv = (
            <div>
            <div className="modal_title">{this.props.data.name}</div>
              <img src={this.props.data.photo}/>
              <div className="price_text">{this.props.data.price}</div>
              <div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>
            </div>
        )
    }

    return (
        <div className="modall">
          {modalDiv}
          <div>
          </div>
        </div>
      );
  }
}
