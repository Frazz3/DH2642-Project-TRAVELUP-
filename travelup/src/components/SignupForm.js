import React from "react";

const SignupForm = ({
  handleSubmit,
  handleChange,
  authError
}) => (
    <div className="container">
      <form onSubmit={handleSubmit} className="input_form">
        <h5 className="grey-test test-darken-3">Sign up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="fistName">First Name</label>
          <input type="text" id="firstName" onChange={handleChange} required/>
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" onChange={handleChange} required/>
        </div>
        <div className="input-field">
          <button className="small_btn">Sign up</button>
        </div>
        <div>
          {authError ? <p>{authError}</p> : null}
        </div>
      </form>

    </div>
  );

export default SignupForm;