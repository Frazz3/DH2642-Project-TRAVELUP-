import React from "react";

const Start = ({
  handleClickLogin,
  handleClickSignUp
}) => (
    // <Button variant="outlined" color="secondary" id = 'login' onClick={this.handleClickLogin}>Log in</Button>
    // <Button variant="outlined" color="secondary" id= 'signup' onClick={this.handleClickSignUp}>Sign Up</Button>

    <div className="container">
      <div className="title_text">Welcome to TravelUp</div> 
      <br />
      <div className="info_text_start">TravelUp is a site that helps you plan your dream vacation. 
        All you need to do is sign up and get started. To plan a trip you first search for a destination you would like to travel to, 
        and then you can browse through all restaurants, accommodations and activities there. 
        Whenever you find something you like you can add it to you trip. 
        We are here to help you make the perfect to-do for your upcoming vacation.</div>
      <br />
      <button className="small_btn" id='login' onClick={handleClickLogin}>Log in</button>
      <button className="small_btn" id='signup' onClick={handleClickSignUp}>Sign Up</button>
      <br />
    </div>
  )

export default Start;