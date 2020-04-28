import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles, ButtonBase, Typography } from '@material-ui/core';



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
            width: "225px",
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

        // Images taken from  Unsplash
        // Restaurants: https://unsplash.com/@jaywennington
        // Accommodation: https://unsplash.com/@niklanus
        // Activities: https://unsplash.com/@septdoigt
        const images = [
            {
              url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
              title: 'Restaurants',
              disable: false,
            },
            {
                url: 'https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
                title: 'Accommodation',
                disable: false,
            },
            {
                url: 'https://images.unsplash.com/photo-1506426235353-205ad887bb38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
                title: 'Activities',
                disable: false,
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
            return (
            <div className="container">
                <img src="http://www.csc.kth.se/~cristi/loading.gif"></img>
            </div>)
        }else{
            return(

            <div className="container">
                <div>
                    <h1 style={styleText}>Let's plan your trip to {this.props.location}</h1>
                </div>
                <div>
                {this.createButton(images[0], "/food")}
                <br/><br/>
                {this.createButton(images[1], "/accommodations")}
                <br/><br/>
                {this.createButton(images[2], "/activities")}
                </div>
            </div>


            )
            // <div className="myTrip"><this.props.myTrip/></div>
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
