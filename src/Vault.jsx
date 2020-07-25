import React, { useState } from "react"
import logo from "./logo.svg"
import { TextField, Button } from '@material-ui/core/'

export const Vault = () => {
  const [isUnlocking, setIsUnlocking] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()

    fetch("/.netlify/functions/submitAnswer")
      .then(response => response.json())
      .then(json => console.log(json))

    setIsUnlocking(true)
    setTimeout(() => {
      setIsUnlocking(false)
      setTimeout(() => alert('Unlocked!'), 500)
    }, 5000)
  }

  return (
    <div className='content'>
      <div className='header'>
        <strong>⌘</strong> <b>Opt</b>ical <b>C</b>ybersecurity
          </div>
      <div className='body'>
        <img src={logo} className={`vault ${isUnlocking ? 'unlocking' : ''}`} alt="logo" />
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
                <Button variant="outlined" onClick={() => { }}>View password hint</Button>
                <div className='passwordHint hidden'>JFK's Birthplace</div>
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