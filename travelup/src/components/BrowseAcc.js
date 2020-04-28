import React from "react";
import { Checkbox, FormGroup, FormControl, FormControlLabel, FormLabel, Button, } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchActivities } from "../actions/activityActions"
import { addActivity } from "../actions/tripActions"
