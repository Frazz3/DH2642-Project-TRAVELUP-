import React from "react";
import { Checkbox, FormGroup, FormControl, FormControlLabel, InputLabel, FormLabel, Button, Select, MenuItem } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchAcc } from "../actions/accActions"
import { addAccommodation } from "../actions/tripActions"
import BrowseAcc from "../components/BrowseAcc"

const amenities = [{ label: "Free Internet", code: "free_internet" }, { label: "Free Parking", code: "free_parking" }, { label: "Restaurant", code: "restaurant" }, { label: "Free Breakfast", code: "free_breakfast" }, { label: "Wheelchair access", code: "wheelchair_access" }, { label: "Spa", code: "spa" }, { label: "Bar/Lounge", code: "bar_lounge" }, { label: "Fitness Center", code: "fitness_center" }, { label: "Room Service", code: "room_service" }, { label: "Swimming Pool", code: "swimming_pool" }, { label: "Airport Transportation", code: "airport_transportation" }, { label: "All", code: "all" }]

class BrowseAccContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            free_internet: false,
            free_parking: false,
            restaurant: false,
            free_breakfast: false,
            wheelchair_access: false,
            spa: false,
            bar_lounge: false,
            fitness_center: false,
            room_service: false,
            swimming_pool: false,
            airport_transportation: false,
            all: false,
            show: false,
            dataModal: {},
            modalType: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    componentWillMount() {
        // fetches activityCategory from the location. No filtering.
        //console.log(this.props.location_id)
        this.props.fetchAcc(this.props.location_id);
    }

    returnToBrowse = () => {
        this.props.history.push('/select');
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    };

    stringFunc = (name) => {
        let str = "this.state." + name
        return str
    };

    handleClick = () => {
        this.setState({
            loading: true
        })

        let amenitiesString = ""
        amenities.map(obj => {
            let name = obj.code;
            let stName = this.stringFunc(name);
            if (eval(stName) === true) {
                amenitiesString += obj.code + ",";
            };
        })
        if (amenitiesString.charAt(amenitiesString.length - 1) === ",") {
            amenitiesString = amenitiesString.slice(0, amenitiesString.length - 1);
        }

        this.props.fetchAcc(this.props.location_id, amenitiesString);
    }

    addAccommodationToTrip = (acc) => {
        console.log("ADDING ACC")
        let accommodation = { id: acc.location_id, name: acc.name, price: acc.price, location_id: acc.location_id, photo: acc.photo.images.small.url }

        // don't want to add duplicates (not sure where to put this, here or in the reducer?)
        let duplicate = false;
        let x;
        for (x of this.props.tripAccommodations) {
            console.log(x.id)
            // we have already added that activity
            if (x.id === acc.location_id) {
                console.log("ALREADY ADDED")
                duplicate = true;
                this.getModal(acc, "c")
            }
        }
        //only add if it's not already added
        if (!duplicate) {
            this.props.addAccommodation(accommodation);
            this.setState({
                show: false
            })
        }

        else {
            console.log('do not add');
        }
    }

    hideModal = () => {
        this.setState({
            show: false
        })
    }

    getModal = (data, type) => {
        this.setState({
            show: true,
            dataModal: data,
            modalType: type
        })
    }

    createCheckbox = (label, stateName, handleChange) => {
        return (
          <FormControlLabel key={stateName}
            // control={<Checkbox checked={this.state.stateName} onChange={handleChange} name={stateName} />}
            control={<Checkbox checked={this.state.stateName} onChange={handleChange} name={stateName} />}
      
            label={label} />
        )
      }
      
      amenitiesCheckbox = (amenities, handleChange) => {
        return (
          <FormGroup row>
            {amenities.map(obj => { return this.createCheckbox(obj.label, obj.code, handleChange) })}
          </FormGroup>
        )
      };



    spinner = () => {
        return (
            <div className="spinner" key="spinner">
                <img src="http://www.csc.kth.se/~cristi/loading.gif"></img>
            </div>
        )
    }

    render() {
        const { auth, location_id } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        if (!location_id) return <Redirect to='/' />


        if (typeof this.props.accommodations === "undefined") {
            // tills vidare, vill kanske returnera mer
            return (
                <div>
                    {this.spinner()}
                </div>
            )
        }

        //   console.log('items', accItems)

        return (
            <BrowseAcc
                accommodations={this.props.accommodations}
                amenities={amenities}
                addAccommodation={this.addAccommodationToTrip}
                accError={this.props.accError}
                handleClick={this.handleClick}
                handleChange={this.handleChange}
                returnToBrowse={this.returnToBrowse}
                getModal={this.getModal}
                hideModal={this.hideModal}
                show={this.state.show}
                dataModal={this.state.dataModal}
                modalType={this.state.modalType}
                amenitiesCheckbox={this.amenitiesCheckbox(amenities, this.handleChange)}
            />
        )
    }
}

BrowseAccContainer.propTypes = {
    fetchAcc: PropTypes.func.isRequired,
    addAccommodationToTrip: PropTypes.func.isRequired
}

const mapStateToProps = state => (
    {
        auth: state.firebase.auth,
        accommodations: state.accommodations.items,
        location_id: state.location.id,
        tripAccommodations: state.trip.accommodations,
        accError: state.accommodations.accError
    })


const mapDispatchToProps = (dispatch) => {
    return {
        fetchAcc: (location_id, ameneties) => dispatch(fetchAcc(location_id, ameneties)),
        addAccommodation: (accommodation) => dispatch(addAccommodation(accommodation))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseAccContainer);
// export default connect(mapStateToProps, { fetchAcc, addAccommodation })(BrowseAccContainer);
