import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Web3 from 'web3'

import TopNavigation from '../components/nav/Topbar'
import LoginPage from '../pages/Login'
import Portal from '../pages/Portal'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'


class App extends Component {
    constructor( props ) {
        super( props )
        this.state = { account: '' }
    }

    async loadBlockchainData() {
        const web3 = new Web3( Web3.givenProvider || "http://localhost:9545" )
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        console.log('Account Address: ', this.state.account)
    }

    componentWillMount() {
        this.loadBlockchainData()
    }

    render() {
        return (
            <div className="app-main">
                <Router>
                    <TopNavigation />
                    <Switch>
                        <Route path="/portal/page1" component={PageA}/>
                        <Route path="/portal/page2" component={PageB}/>
                        <Route path="/portal" component={Portal}/>
                       
                        <Route path="/account/login" component={LoginPage}/>
                        <Route path="/account/logout" component={LogoutPage}/>
                       
                        <Route path="/" component={PageHome}/>
                    </Switch>
                </Router>
            </div>
        )
    }
} 


function PageHome() {
    return (
        <div>
            <h1>page:home</h1>
        </div>
    )
}
function PageA() {
    return (
        <div>
            <h1>page:A</h1>
        </div>
    )
}
function PageB() {
    return (
        <div>
            <h1>page:B</h1>
        </div>
    )
}
function LogoutPage() {
    return (
        <div>
            <h1>page:logging-out</h1>
        </div>
    )
}

export default App;