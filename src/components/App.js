import React, { Component } from 'react'
import { Container, Jumbotron, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Web3 from 'web3'
import TruffleContract from '@truffle/contract'
//import { secureVoteAddress } from '../config'
import secureVoteJson from '../artifacts/SecureVote.json'

import TopNavigation from '../components/nav/Topbar'
import PageTitle from '../components/text/Title'
import LoginPage from '../pages/Login'
import PortalPage from '../pages/Portal'
import RegisterCandidatePage from '../pages/RegisterCandidate'
import RegisterVoterPage from '../pages/RegisterVoter'
import RegisterAgentPage from '../pages/RegisterAgent'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { account: '', contract: null, loggedIn: false }

    }

    async loadBlockchainData() {
        // if( window.ethereum ){ // metamask
        //     this.provider = window.ethereum
        //     this.web3 = new Web3(this.provider)

        //     const accounts = await window.ethereum.enable()
        //     this.setState({ account: accounts[0] })

        //     window.ethereum.on('accountsChanged', )

        // } else {
        this.provider = Web3.givenProvider || "http://localhost:9545"
        this.web3 = new Web3(this.provider)

        const accounts = await this.web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        // }
        //this.web3.eth.defaultAccount = accounts[0]

        this.SecureVoteContract = TruffleContract(secureVoteJson)
        this.SecureVoteContract.setProvider(this.provider)

        this.SecureVoteContract.deployed().then((instance) => {
            this.setState({ 'contract': instance })
        })

    }

    componentDidMount() {
        this.loadBlockchainData()
    }

    handleUserLoginStatus = (data) => {
        this.setState({ loggedIn: true })
    }

    render() {
        return (
            <div className="app-main">
                <Router>
                    <TopNavigation address={this.state.account} loggedIn={this.state.loggedIn} />
                    <Container>
                        <Switch>
                            <Route path="/portal/page1" component={PageA} />
                            <Route path="/portal/page2" component={PageB} />
                            <Route path="/portal" render={(props) => <PortalPage contract={this.state.contract} account={this.state.account} loggedIn={this.state.loggedIn} {...props} />} />

                            <Route path="/manage/register-candidate" render={(props) => <RegisterCandidatePage contract={this.state.contract} account={this.state.account} loggedIn={this.state.loggedIn} {...props} />} />
                            <Route path="/manage/register-voter" render={(props) => <RegisterVoterPage contract={this.state.contract} account={this.state.account} loggedIn={this.state.loggedIn} {...props} />} />
                            <Route path="/manage/register-agent" render={(props) => <RegisterAgentPage contract={this.state.contract} account={this.state.account} loggedIn={this.state.loggedIn} {...props} />} />
                            <Route path="/manage/result" component={PageUnderConstruction} />
                            <Route path="/manage" component={PageUnderConstruction} />

                            <Route path="/account/login" render={(props) => <LoginPage loggedIn={this.state.loggedIn} loginUpdate={this.handleUserLoginStatus} {...props} />} />
                            <Route path="/account/logout" component={LogoutPage} />
                            <Route path="/account/profile" component={PageUnderConstruction} />

                            <Route path="/" component={PageHome} />
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
            <Jumbotron>
                <PageTitle title="CHAIN EVS" />
                <p>
                    A secure, Ethereum blockchain based electronic voting system designed with Pakistani elections. The voters login via biometric authentication, and vote using supervisor's pre-approved blockchain address. Only the owner can register agents for management.
                </p>
                <p>
                    <Link to="/portal">
                        <Button variant="primary">Get started!</Button>
                    </Link>
                </p>
            </Jumbotron>
        </div>
    )
}
function PageA() {
    return (
        <div>
            <PageTitle title="PAGE A" subtitle="Just a sample page" />
        </div>
    )
}
function PageB() {
    return (
        <div>
            <PageTitle title="PAGE B" subtitle="Just a sample page" />
        </div>
    )
}
function PageUnderConstruction() {
    return (
        <div>
            <PageTitle title="UNDER CONSTRUCTION" subtitle="This page is under construction" />
        </div>
    )
}
function LogoutPage() {
    return (
        <div>
            <PageTitle title="LOGOUT PAGE" subtitle="Just a sample page" />
        </div>
    )
}

export default App;