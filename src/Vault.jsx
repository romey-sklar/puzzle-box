import React, { useState } from "react"
import logo from "./logo.svg"
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/'

export const Vault = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(`/.netlify/functions/submitAnswer?username=${username}&password=${password}`)
      .then(response => response.json())
      .then(answer => {
        setIsUnlocking(true)
        setTimeout(() => {
          setIsUnlocking(false)
          setSuccessMsg(answer.msg)
        }, 5000)
      }).catch((error) => {
        if (error.statusCode === 401) {
          setErrorMsg(error.msg)
        } else {
          setErrorMsg('Something went wrong. Please reload page and try again or contact puzzle box support.')
        }
      });
  }

  const handleClose = () => setErrorMsg(null)

  const errorMsgModal = (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={!!errorMsg} >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Error accessing vault
      </DialogTitle>
      <DialogContent dividers>
        {errorMsg}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
          </Button>
      </DialogActions>
    </Dialog >
  )

  const loginContent = (
    <>
      <img src={logo} className={`vault ${isUnlocking ? 'unlocking' : ''}`} alt="logo" />
      <h2>Login to Access Vault</h2>
      <div>
        <form onSubmit={handleSubmit} className='loginForm'>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              name='username'
              required
              id="outlined-required"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={event => {
                const { value } = event.target
                setUsername(value)
              }}
            />
          </div>
          <div>
            <TextField
              name='password'
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={event => {
                const { value } = event.target
                setPassword(value)
              }}
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
    </>
  )

  const successPage = (
    <div className='successContainer'>
      <div className='message'>
        {successMsg}
      </div>
    </div>
  )

  return (
    <div className='content'>
      <div className='header'>
        <strong>⌘</strong> <b>Opt</b>ical <b>C</b>ybersecurity
          </div>
      <div className='body'>
        {successMsg ? successPage : loginContent}
      </div>
      {errorMsgModal}
    </div>
  )
}