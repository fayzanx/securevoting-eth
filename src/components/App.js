import React, { Component } from 'react'
import './App.css'
import Web3 from 'web3'

class App extends Component {
    constructor( props ) {
        super( props )
        this.state = { account: '' }
    }

    async loadBlockchainData() {
        const web3 = new Web3( Web3.givenProvider || "http://localhost:9545" )
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        console.log('accounts', accounts)
    }

    componentWillMount() {
        this.loadBlockchainData()
    }

    render() {
        return (
            <div className="container">
                <h1>App.js</h1>
                <p>Account Address: {this.state.account}</p>
            </div>
        )
    }
}

export default App;