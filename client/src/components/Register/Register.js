import React from "react";
import "./Register.css";

export default function SignUp() {
  return (
    <div className="signup-wrapper">
      <h1>Please Sign Up</h1>
      <form>
        <label>
          <p>Email</p>
          <input type="text"/>
        </label>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <label>
          <p>Confirm Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
