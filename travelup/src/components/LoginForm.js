import React from "react";

const LoginForm = ({
  authError,
  handleSubmit,
  handleChange
}) =>
  (
    <React.Fragment>
      <div className="container">
        <form onSubmit={handleSubmit} className="white">
          <h5 className="grey-test test-darken-3">Sign in</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange} />
          </div>
          <div className="input-field">
            <button className="small_btn">Login</button>
          </div>
          <div>
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
      </div>
    </React.Fragment>
  )

export default LoginForm;