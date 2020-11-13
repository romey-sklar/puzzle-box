import React, { Component } from "react"
import {
  isMacOs,
  isMobile,
  isChrome
} from "react-device-detect";
import "./App.css"
import { Vault } from "./Vault"

class App extends Component {
  render() {
    let browserSupportMsg = ''
    if (isMobile) {
      browserSupportMsg = 'Mobile browsers unsupported. This page only works on desktop devices'
    } else if (!isChrome) {
      browserSupportMsg = 'This page works best on Google Chrome'
    }


    return (
      <div className="App">
        {browserSupportMsg && <div className="browserSupportMsg">
          {browserSupportMsg}
        </div>}
        <Vault isMac={isMacOs} />
      </div>
    )
  }
}

export default App
