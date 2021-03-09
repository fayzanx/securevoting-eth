import React, { Component } from 'react'
import './App.css'

import 'bootstrap/dist/css/bootstrap.css'

import Web3 from 'web3'
import LoginPage from './Page/Login'

class App extends Component {
    constructor( props ) {
        super( props )
        this.state = { account: '' }
    }

    async loadBlockchainData() {
        const web3 = new Web3( Web3.givenProvider || "http://localhost:9545" )
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }

    componentWillMount() {
        this.loadBlockchainData()
    }

    render() {
        return (
            <div className="App">
                <LoginPage />
                
                <h1>Voting App</h1>
                <p>Account Address: {this.state.account}</p>
            </div>
        )
    }
} 

export default App;