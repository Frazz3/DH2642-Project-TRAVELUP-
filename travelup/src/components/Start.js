import React from "react";

const Start = ({
  handleClickLogin,
  handleClickSignUp
}) => (
    // <Button variant="outlined" color="secondary" id = 'login' onClick={this.handleClickLogin}>Log in</Button>
    // <Button variant="outlined" color="secondary" id= 'signup' onClick={this.handleClickSignUp}>Sign Up</Button>

    <div className="container">
      <b> Welcome to TravelUp </b>
      <br />
      <i>Your personal trip planner</i>
      <br />
      <button className="small_btn" id='login' onClick={handleClickLogin}>Log in</button>
      <button className="small_btn" id='signup' onClick={handleClickSignUp}>Sign Up</button>
      <br />
    </div>
  )

export default Start;