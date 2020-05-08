import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchActivities } from "../actions/activityActions";
import { addActivity } from "../actions/tripActions";
import spinner from "../util";
import BrowseActivities from "../components/BrowseActivities";

const activity_subcategories = [{ label: "Nightlife", code: "20", state: "nightlife" }, { label: "Shopping", code: "26", state: "shopping" }, { label: "Food & Drink", code: "36", state: "foodDrink" }, { label: "Spas & Wellness", code: "40", state: "spasWellness" }, { label: "Classes & Workshops", code: "41", state: "classesWorkshops" }, { label: "Tours", code: "42", state: "tours" }, { label: "Sights & Landmarks", code: "47", state: "sightsLandmarks" }, { label: "Zoos & Aquariums", code: "48", state: "zoosAquariums" }, { label: "Museums", code: "49", state: "museums" }, { label: "Water & Amusement Parks", code: "52", state: "waterAmusementParks" }, { label: "Casinos & Gambling", code: "53", state: "casinosGambling" }, { label: "Boat Tours & Water Sports", code: "55", state: "boatToursWaterSports" }, { label: "Fun & Games", code: "56", state: "funGames" }, { label: "Nature & Parks", code: "57", state: "natureParks" }, { label: "Concerts & Shows", code: "58", state: "concertsShows" }, { label: "Transportation", code: "59", state: "transportation" }, { label: "Traveler Resources", code: "60", state: "travelerResources" }, { label: "Outdoor Activities", code: "61", state: "outdoorActivities" }, { label: "Events", code: "62", state: "events" }, { label: "All", code: "0", state: "allCategories" }]
//const activity_rating = [{label : "Terrible", code: "1", state:"terrible"},{label: "Poor",code : "2",state:"poor"},{label:"Average",code: "3",state:"average"},{label:"Very good",code:"4",state:"veryGood"},{label:"Excellent",code:"5",state:"excellent"},{label:"All",code: "all",state:"allRatings"}]

class BrowseActivitiesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "0",
            show: false,
            dataModal: {},
            modalType: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        // fetches activityCategory from the location. No filtering.
        this.props.fetchActivities(this.props.location_id);
    }

    returnToBrowse = () => {
        this.props.history.push('/select');
    }

    handleChange = event => {
        this.setState({
            category: event.target.value
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

        // let activityRating = ""
        // activity_rating.map(obj=>
        //   {let name = obj.state;
        //   let stName = this.stringFunc(name);
        //   if(eval(stName) === true){
        //     activityRating += obj.code+",";
        // };
        // })

        // let activityCategory = ""
        // activity_subcategory.map(obj=>
        //   {let name = obj.state;
        //   let stName = this.stringFunc(name);
        //   if(eval(stName) === true){
        //     activityCategory = obj.code;
        // };
        // })
        // if(activityCategory.charAt(activityCategory.length-1) === ","){
        //   activityCategory = activityCategory.slice(0,activityCategory.length-1);
        // }
        // if(activityRating.charAt(activityRating.length-1) === ","){
        //   activityRating = activityRating.slice(0,activityRating.length-1);
        // }
        this.props.fetchActivities(this.props.location_id, this.state.category);

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

    addActivityToTrip = (activity) => {
        let act = { id: activity.location_id, name: activity.name, price: activity.price, description: activity.description, location_id: activity.location_id, photo: activity.photo.images.small.url, website: activity.website }

        // don't want to add duplicates (not sure where to put this, here or in the reducer?)
        let duplicate = false;
        let x;
        for (x of this.props.tripActivities) {
            // we have already added that activity
            if (x.id === activity.location_id) {
                duplicate = true;
                this.getModal(activity, "c")
            }
        }
        //only add if it's not already added
        if (!duplicate) {
            this.props.addActivity(act);
            this.setState({
                show: false
            })
        }
    }

    render() {
        const { auth, location_id } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        if (!location_id) return <Redirect to='/' />

        if (typeof this.props.activities === "undefined") {
            // tills vidare, vill kanske returnera mer
            return (
                <div>
                    {spinner()}
                </div>
            )
        }

        return (
            <BrowseActivities
                activities={this.props.activities}
                addActivity={this.addActivityToTrip}
                category={this.state.category}
                activity_subcategories={activity_subcategories}
                activityError={this.props.activityError}
                handleClick={this.handleClick}
                handleChange={this.handleChange}
                returnToBrowse={this.returnToBrowse}
                getModal={this.getModal}
                hideModal={this.hideModal}
                show={this.state.show}
                dataModal={this.state.dataModal}
                modalType={this.state.modalType}
            />
        );
    }
}


BrowseActivities.propTypes = {
    fetchActivities: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
    addActivity: PropTypes.func.isRequired
}

const mapStateToProps = state => (
    {
        auth: state.firebase.auth,
        activities: state.activities.items, //de som är fetchade
        location_id: state.location.id,
        tripActivities: state.trip.activities, //de vi lagt till i vår trip
        activityError: state.activities.activityError
    })


const mapDispatchToProps = (dispatch) => {
    return {
        fetchActivities: (location_id, activity_subcategory) => dispatch(fetchActivities(location_id, activity_subcategory)),
        addActivity: (activity) => dispatch(addActivity(activity))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseActivitiesContainer);
