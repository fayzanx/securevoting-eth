import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Web3 from 'web3'

import TopNavigation from '../components/nav/Topbar'
import PageTitle from '../components/text/Title'
import LoginPage from '../pages/Login'
import PortalPage from '../pages/Portal'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

class App extends Component {
    constructor( props ) {
        super( props )
        this.state = { account: '', loggedIn: false }
        this.handleUserLoginStatus = this.handleUserLoginStatus.bind(this)
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

    handleUserLoginStatus( data ) {
            this.setState({ loggedIn: true })
    }

    render() {
        return (
            <div className="app-main">
                <Router>
                    <TopNavigation loggedIn={this.state.loggedIn}/>
                    <Container>
                        <Switch>
                            <Route path="/portal/page1" component={PageA}/>
                            <Route path="/portal/page2" component={PageB}/>
                            <Route path="/portal" render={(props) => <PortalPage account={this.state.account} loggedIn={this.state.loggedIn} {...props} />}/>
                        
                            <Route path="/account/login" render={(props) => <LoginPage loggedIn={this.state.loggedIn} loginUpdate={this.handleUserLoginStatus} {...props} />}/>
                            <Route path="/account/logout" component={LogoutPage}/>
                        
                            <Route path="/" component={PageHome}/>
                        </Switch>
                    </Container>
                </Router>
            </div>
        )
    }
} 

// sample pages
function PageHome() {
    return (
        <div>
            <PageTitle title="HOME PAGE" subtitle="Just a sample page"/>
        </div>
    )
}
function PageA() {
    return (
        <div>
            <PageTitle title="PAGE A" subtitle="Just a sample page"/>
        </div>
    )
}
function PageB() {
    return (
        <div>
            <PageTitle title="PAGE B" subtitle="Just a sample page"/>
        </div>
    )
}
function LogoutPage() {
    return (
        <div>
            <PageTitle title="LOGOUT PAGE" subtitle="Just a sample page"/>
        </div>
    )
}

export default App;