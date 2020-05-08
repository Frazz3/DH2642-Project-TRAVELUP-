import React from "react";
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchRestaurants } from "../actions/foodActions";
import { addRestaurant } from "../actions/tripActions";
import spinner from "../util";
import BrowseFood from "../components/BrowseFood"

class BrowseFoodContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /*
            priceFilter: "all",
            mealtypeFilter: "all"
            */

            cheap: false,
            medium: false,
            expensive: false,
            allPrice: false,

            breakfast: false,
            brunch: false,
            lunch: false,
            dinner: false,
            allMealtype: false,
            show: false,
            dataModal: {},
            modalType: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        // fetches restaurants from the location. No filtering.
        this.props.fetchRestaurants(this.props.location_id);
    }

    returnToBrowse = () => {
        this.props.history.push('/select');
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    };

    handleClick = () => {
        this.setState({
            loading: true
        })

        let restaurant_mealtype = "";
        if (this.state.allMealtype === true) {
            restaurant_mealtype = "all";
        } else {
            if (this.state.breakfast === true) {
                restaurant_mealtype += "10597,"
            } if (this.state.brunch === true) {
                restaurant_mealtype += "10606,"
            } if (this.state.lunch === true) {
                restaurant_mealtype += "10598,"
            } if (this.state.dinner === true) {
                restaurant_mealtype += "10599,"
            }
        }

        let prices_restaurants = "";
        if (this.state.allPrice === true) {
            prices_restaurants = "all";
        } else {
            if (this.state.cheap === true) {
                prices_restaurants += "10953,"
            } if (this.state.medium === true) {
                prices_restaurants += "10955,"
            } if (this.state.expensive === true) {
                prices_restaurants += "10954,"
            }
        }

        // fetches restaurants with new filters
        this.props.fetchRestaurants(this.props.location_id, restaurant_mealtype, prices_restaurants);
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
                control={<Checkbox checked={this.state.stateName} onChange={handleChange} name={stateName} />}
                label={label} />
        )
    }

    mealTypesCheckbox = (handleChange) => {
        return (
            <FormGroup row>
                {this.createCheckbox("Breakfast", "breakfast", handleChange)}
                {this.createCheckbox("Brunch", "brunch", handleChange)}
                {this.createCheckbox("Lunch", "lunch", handleChange)}
                {this.createCheckbox("Dinner", "dinner", handleChange)}
                {this.createCheckbox("All", "allMealtype", handleChange)}
            </FormGroup>
        )
    };

    priceCheckbox = (handleChange) => {
        return (
            <FormGroup row>
                {this.createCheckbox("$", "cheap", handleChange)}
                {this.createCheckbox("$$-$$$", "medium", handleChange)}
                {this.createCheckbox("$$$$", "expensive", handleChange)}
                {this.createCheckbox("All", "allPrice", handleChange)}
            </FormGroup>
        )
    };

    addRestaurantToTrip = (restaurant) => {
        let rest = { id: restaurant.location_id, name: restaurant.name, price: restaurant.price, description: restaurant.description, location_id: restaurant.location_id, cuisine: restaurant.cuisine, website: restaurant.website, photo: restaurant.photo.images.small.url }

        // don't want to add duplicates (not sure where to put this, here or in the reducer?)
        let duplicate = false;
        let x;
        for (x of this.props.tripRestaurants) {
            // we have already added that restaurant
            if (x.id === restaurant.location_id) {
                duplicate = true;
                this.getModal(restaurant, "c")
            }
        }
        //only add if it's not already added
        if (!duplicate) {
            this.props.addRestaurant(rest);
            this.setState({
                show: false
            })
        }
    }

    render() {
        const { auth, location_id } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        if (!location_id) return <Redirect to='/' />

        if (typeof this.props.restaurants === "undefined") {
            // tills vidare, vill kanske returnera mer
            return (
                <div>
                    {spinner()}
                </div>
            )
        }

        return (
            <BrowseFood
                restaurants={this.props.restaurants}
                addRestaurant={this.addRestaurantToTrip}
                handleClick={this.handleClick}
                returnToBrowse={this.returnToBrowse}
                foodError={this.props.foodError}
                getModal={this.getModal}
                hideModal={this.hideModal}
                show={this.state.show}
                dataModal={this.state.dataModal}
                modalType={this.state.modalType}
                mealTypesCheckbox={this.mealTypesCheckbox(this.handleChange)}
                priceCheckbox={this.priceCheckbox(this.handleChange)}
            />
        );
    }
}



BrowseFood.propTypes = {
    fetchRestaurants: PropTypes.func.isRequired,
    restaurants: PropTypes.array.isRequired,
    addRestaurantToTrip: PropTypes.func.isRequired
}

const mapStateToProps = state => (
    {
        auth: state.firebase.auth,
        restaurants: state.restaurants.items,
        location_id: state.location.id,
        tripRestaurants: state.trip.restaurants,
        foodError: state.restaurants.foodError
    })


const mapDispatchToProps = (dispatch) => {
    return {
        fetchRestaurants: (location_id, restaurant_mealtype, prices_restaurants) => dispatch(fetchRestaurants(location_id, restaurant_mealtype, prices_restaurants)),
        addRestaurant: (restaurant) => dispatch(addRestaurant(restaurant))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseFoodContainer);