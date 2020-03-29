import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles, ButtonBase, Typography } from '@material-ui/core';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import Typography from '@material-ui/core/Typography';


class SearchSelections extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          location: this.props.location
      }
     
    }

    createButton = (image, link) => {
        const btnStyle = {
            top: "30%",
            backgroundColor: "#239160",
            color: "white",
            fontSize: "16px",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
        }
        const imgStyle = {
            width: "200px",
            height: "150px"
        }
        return (
            <button className="btn" disabled={image.disable} style={btnStyle} onClick ={() => this.props.history.push(link)}>
                {image.title}
                <br/>
                <img src={image.url} style={imgStyle}/>
            </button>
        )

    }

    render(){

        //om vi inte är inloggade ska vi inte kunna se planner-sidan
        const {auth} = this.props;
        if (!auth.uid) return <Redirect to='/' />

        // const {location}  = this.props;
        // if (!location.location)  return <Redirect to='/planner' />

        // OBS! alla bilder är snodda från google, troligtvis upphovsrättsskyddade. Byt ut dem
        const images = [
            {
              url: 'https://www.riverton.se/d/rivertonredesign/media/Restaurants/View_Skybar_Restaurant/__thumbs_1082_640_crop/IMG_2135.jpg',
              title: 'Restaurants',
              width: '40%',
              disable: false,
            },
            {
                url: 'https://a.cdn-hotels.com/images/common/pages/lpa/homepage/propertytypes/mobile/hotels.jpg',
                title: 'Accommodation',
                width: '40%',
                disable: true,
            },
            {
                url: 'https://cdn.thecrazytourist.com/wp-content/uploads/2017/10/ccimage-shutterstock_117014839.jpg',
                title: 'Activities',
                width: '40%',
                disable: true,
            }
        ]
        
        

        
        
        
        
        const styleText = {
            color: "#239160",
            padding: "10px",
            fontFamily: "Arial",
            textAlign: "center"
        }

        if(!this.props.location){
            console.log(this.props.location)
            return <div>No location</div>
        }else{
            return(
            <div>
                <div>
                    <h1 style={styleText}>Let's plan your trip to {this.props.location}</h1>
                </div>
                <div>
                {this.createButton(images[0], "/food")}
                <br/><br/>
                {this.createButton(images[1], "/select")}
                <br/><br/>
                {this.createButton(images[2], "/select")}
                </div>
            </div>
            )
            //the last two does not have any search method
        }
        
    }
}

const mapStateToProps = (state) => {
    // skulle vilja lägga in location innan man går vidare... nu tar fetchen tid så location kommer inte upp när man rendrar
    console.log(state.location.name)
    return {
      auth: state.firebase.auth,
      location: state.location.name,
    }
  }

export default connect(mapStateToProps)(SearchSelections);