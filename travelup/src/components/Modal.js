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
    if(this.props.type === "o"){
        modalDiv = (
            <div>
            <div className="modal_title">{this.props.data.name}</div>
              <img src={this.props.data.photo}/>
              <div className="modal_text">{this.props.data.description}</div>
              <div className="price_text">{this.props.data.price}</div>
              <p><a href={this.props.data.website}>{website}</a></p>
              </div>
            );
    } else if(this.props.case === "b"){
        modalDiv = (<div>
            <div className="modal_title">{this.props.data.name}</div>
              <img src={this.props.data.photo.images.small.url}/>
              <div className="modal_text">{this.props.data.description}</div>
              <div className="price_text">{this.props.data.price}</div>
              <p><a href={this.props.data.website}>{website}</a></p>
              </div>)
    } else{
        modalDiv = (
            <div>
            <div className="modal_title">{this.props.data.name}</div>
              <img src={this.props.data.photo}/>
              <div className="price_text">{this.props.data.price}</div>
            </div>
        )
    }

    return (
        <div className="modall">
          {modalDiv}
          <div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>
          <div>
          </div>
        </div>
      );
  }
}
