import React, { useState } from "react"
import logo from "./logo.svg"
import { TextField, Button } from '@material-ui/core/'

export const Vault = () => {
  const handleSubmit = () => {
    alert("Submitted")
  }
  return (
    <div className='content'>
      <div className='header'>
        <strong>⌘</strong> <b>Opt</b>ical <b>C</b>ybersecurity
          </div>
      <div className='body'>
        <img src={logo} className="vault" alt="logo" />
        <h2>Login to Access Vault</h2>
        <div>
          <form onSubmit={handleSubmit} className='loginForm'>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                required
                id="outlined-required"
                label="Username"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className='buttonGroup'>
              <div className='phButton'>
                <Button variant="outlined">View password hint</Button>
                <div className='passwordHint'></div>
              </div>
              <Button variant="outlined" color="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}