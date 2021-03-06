import React, { useState } from "react"
import logo from "./logo.svg"
import inspect from "./inspect.png"
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

const NO_USERNAME_MSG = 'No username entered. To get a hint, please enter a username.'
const INVALID_USERNAME_MSG = 'This username does not match an existing account. No hint available.'

export const Vault = (props) => {
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
        } else if (response.status !== 200) {
          throw new Error(ERROR_INFO.msg)
        } else {
          return Promise.resolve(response.json()).then(data => {
            setIsUnlocking(true)
            setTimeout(() => {
              setIsUnlocking(false)
              setSuccessMsg(data.msg)
            }, 5000)
          })
        }
      }).catch(() => {
        setCurrentModalInfo(ERROR_INFO)
      })
  }

  const handleClose = () => setCurrentModalInfo(null)

  const usernameIsCorrect = () => username.toLowerCase() === 'admin'

  const currentModal = (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={!!currentModalInfo} >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {currentModalInfo && currentModalInfo.title}
      </DialogTitle>
      <DialogContent dividers>
        {currentModalInfo === PASSWORD_HINT && !usernameIsCorrect() ?
          (!username ? NO_USERNAME_MSG : INVALID_USERNAME_MSG) :
          currentModalInfo && currentModalInfo.msg}
      </DialogContent>
      {currentModalInfo === PASSWORD_HINT && usernameIsCorrect() ? (<DialogContent dividers>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: '4px' }}>
            <img src={inspect} className="inspect" alt="inspect-element-pointer"></img>
          </span>
          <span className='passwordHint'>
            <span style={{ marginRight: '8px' }}>Hint: </span>
            <div className='ENCRYPTED'>
              <span style={{ display: 'none' }}></span>
              <span>m</span>
              <span>P</span>
              <span>p</span>
              <span>j</span>
              <span>e</span>
              <span>7</span>
              <span>g</span>
              <span>r</span>
              <span>5</span>
              <span>d</span>
              <span>3</span>
              <span>/</span>
              <span>a</span>
              <span>y</span>
              <span>l</span>
              <span>7</span>
              <span>.</span>
              <span>t</span>
              <span>4</span>
              <span>i</span>
              <span>b</span>
              <span>1</span>
              {/* https://bit.ly/35r7epP */}
            </div>
          </span>
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

  const headerText = props.isMac ?
    <><b>⌘</b> <b>Opt</b>ical <b>C</b>ybersecurity</> :
    <><b>⇧</b> <b>Control</b>led <b>C</b>ybersecurity</>

  return (
    <div className='content'>
      <div className={`header ${currentModalInfo && currentModalInfo === PASSWORD_HINT ? 'conditionalBold' : ''}`}>
        {headerText}
      </div>
      <div className='body'>
        {successMsg ? successPage : loginContent}
      </div>
      {currentModal}
    </div>
  )
}