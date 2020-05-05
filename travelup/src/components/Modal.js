import React from "react";


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
          <div>{this.props.data.name}</div>
          {/* <img src={this.props.data.photo.images.small.url}/> */}
          <div>{this.props.data.description}</div>
          <div>{this.props.data.price}</div>
          <div>
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      );
  }
}
