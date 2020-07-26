import React, { useState } from "react"
import logo from "./logo.svg"
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/'

const ERROR_INFO = {
  title: 'Error',
  msg: 'Something went wrong. Please reload page and try again or contact puzzle box support.'
}

const INVALID_LOGIN_INFO = {
  title: 'Error',
  msg: 'Incorrect username and password combination. Please try again.'
}

const PASSWORD_HINT = {
  title: 'Access Restricted',
  msg: 'Password hint has been encrypted since our identity fingerprinting technology has identified you as a potential hacking threat.'
}

const INVALID_USERNAME_MSG = 'This username does not match an existing account. No hint available.'

export const Vault = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentModalInfo, setCurrentModalInfo] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(`/.netlify/functions/submitAnswer?username=${username}&password=${password}`)
      .then(response => {
        if (response.status === 401) {
          setCurrentModalInfo(INVALID_LOGIN_INFO)
          return
        } else if (response.status !== 200) {
          throw new Error(ERROR_INFO.msg)
        }
        return response.json()
      })
      .then(data => {
        setIsUnlocking(true)
        setTimeout(() => {
          setIsUnlocking(false)
          setSuccessMsg(data.msg)
        }, 5000)
      }).catch(() => {
        setCurrentModalInfo(ERROR_INFO)
      })
  }

  const handleClose = () => setCurrentModalInfo(null)

  const usernameIsCorrect = () => username.toLowerCase() === 'master'

  const currentModal = (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={!!currentModalInfo} >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {currentModalInfo && currentModalInfo.title}
      </DialogTitle>
      <DialogContent dividers>
        {currentModalInfo === PASSWORD_HINT && !usernameIsCorrect() ?
          INVALID_USERNAME_MSG :
          currentModalInfo && currentModalInfo.msg}
      </DialogContent>
      {currentModalInfo === PASSWORD_HINT && usernameIsCorrect() ? (<DialogContent dividers>
        <span>Hint: </span>
        <div className='passwordHint encrypted'>
          <span>7</span>
          <span>e</span>
          <span>i</span>
          <span>c</span>
          <span>b</span>
          <span>c</span>
          <span>a</span>
          <span>r</span>
          <span>n</span>
          <span>o</span>
          <span>w</span>
          <span>b</span>
          <span>i</span>
          <span>t</span>
          <span>F</span>
        </div>
      </DialogContent>) : null}
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
      <h2>Log In to Access Vault</h2>
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
              <Button variant="outlined" onClick={() => {
                setCurrentModalInfo(PASSWORD_HINT)
              }}>View password hint</Button>
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
      <div className={`header ${currentModalInfo && currentModalInfo === PASSWORD_HINT ? 'conditionalBold' : ''}`}>
        <b>⌘</b> <b>Opt</b>ical <b>C</b>ybersecurity
      </div>
      <div className='body'>
        {successMsg ? successPage : loginContent}
      </div>
      {currentModal}
    </div>
  )
}