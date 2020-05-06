import React from "react";
import { Button} from '@material-ui/core';

export default class Modal extends React.Component {
    

// onClose = e => {
//     this.props.onClose && this.props.onClose(e);
//     };

  render() {
    console.log(this.props.show)
    console.log(this.props.data)
    if (!this.props.show) {
      return null;
    }

    return (
        <div className="modal">
          <div className="modal_title">{this.props.data.name}</div>
          <img src={this.props.data.photo}/>
          <div className="modal_text">{this.props.data.description}</div>
          <div className="price_text">{this.props.data.price}</div>
          <div><button className="modal_btn" variant="outlined" onClick={this.props.onClose}>
              Close
            </button></div>
          <div>
          </div>
        </div>
      );
  }
}
