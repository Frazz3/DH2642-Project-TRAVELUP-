import React from "react";
import { Button} from '@material-ui/core';

export default class Modal extends React.Component {
    

  render() {
    console.log(this.props.show)
    console.log(this.props.data)
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
    }
    else{
        modalDiv = (
            <div>
            <div className="modal_title">{this.props.data.name}</div>
              <img src={this.props.data.photo}/>
              <div className="price_text">{this.props.data.price}</div>
            </div>
        )
    }


    return (
        <div className="modal">
            {modalDiv}
          <div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>Close</button></div>
        </div>
      );
  }
}
