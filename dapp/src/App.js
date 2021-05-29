import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import Web3 from 'web3'
import { Container, Jumbotron, Button } from 'react-bootstrap'

// contracts
import TruffleContract from '@truffle/contract'
import secureVoteJson from './artifacts/SecureVote.json'

// state managemenet
import { useDispatch } from 'react-redux'
import { getConstituencies, getParties, resetVoter } from './state/actions'

// pages for the router
import PortalPage from './components/pages/Portal'
import LoginPage from './components/pages/Login'
import ManageResultPage from './components/pages/ManageResult'
import RegisterVoterPage from './components/pages/RegisterVoter'
import RegisterAgentPage from './components/pages/RegisterAgent'
import RegisterCandidatePage from './components/pages/RegisterCandidate'

// helping components
import TopNavigation from './components/nav/Topbar'
import PageTitle from './components/text/Title'

// styles
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

const App = ( props ) => {

    // redux -state
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch( getParties() )
        dispatch( getConstituencies() )
    },[ dispatch ])

    // normal state
    const [loggedInStatus, changeLoggedInStatus] = useState( false )
    const [accountAddress, setAccountAddress] = useState( '0xdeaddeaddead' )
    const [contractInstance, setContractInstance] = useState( null )

    useEffect(()=>{
        loadBlockchainData()
    },[])

    const handleUserLoginStatus = (status, data) => {
        changeLoggedInStatus( status )
    }

    const loadBlockchainData = async () => {
        // if( window.ethereum ){ // metamask
        //     this.provider = window.ethereum
        //     this.web3 = new Web3(this.provider)

        //     const accounts = await window.ethereum.enable()
        //     this.setState({ account: accounts[0] })

        //     window.ethereum.on('accountsChanged', )

        // } else {
        const _provider = Web3.givenProvider || "http://localhost:9545"
        const _web3 = new Web3(_provider)

        const accounts = await _web3.eth.getAccounts()
        setAccountAddress( accounts[0] )
        // }
        //this.web3.eth.defaultAccount = accounts[0]

        const SecureVoteContract = TruffleContract(secureVoteJson)
        SecureVoteContract.setProvider( _provider )

        SecureVoteContract.deployed().then((instance) => {
            setContractInstance( instance )
        })

    }

    return (
        <div className="app-main">
        <Router>
            <TopNavigation address={accountAddress} loggedIn={loggedInStatus} />
            <Container>
                <Switch>
                    <Route path="/portal/page1" component={PageA} />
                    <Route path="/portal/page2" component={PageB} />
                    <Route path="/portal" render={(props) => <PortalPage contract={contractInstance} account={accountAddress} loggedIn={loggedInStatus} constituency={1052} {...props} />} />

                    <Route path="/manage/register-candidate" render={(props) => <RegisterCandidatePage contract={contractInstance} account={accountAddress} loggedIn={loggedInStatus} {...props} />} />
                    <Route path="/manage/register-voter" render={(props) => <RegisterVoterPage contract={contractInstance} account={accountAddress} loggedIn={loggedInStatus} {...props} />} />
                    <Route path="/manage/register-agent" render={(props) => <RegisterAgentPage contract={contractInstance} account={accountAddress} loggedIn={loggedInStatus} {...props} />} />
                    <Route path="/manage/result" render={(props) => <ManageResultPage contract={contractInstance} account={accountAddress} loggedIn={loggedInStatus} {...props} />} />
                    <Route path="/manage" component={PageUnderConstruction} />

                    <Route path="/account/login" render={(props) => <LoginPage loggedIn={loggedInStatus} loginUpdate={handleUserLoginStatus} {...props} />} />
                    <Route path="/account/logout" render={(props) => <LogoutPage loggedIn={loggedInStatus} loginUpdate={handleUserLoginStatus} {...props} />} />
                    <Route path="/account/logout" component={LogoutPage} />
                    <Route path="/account/profile" component={PageUnderConstruction} />

                    <Route path="/" component={PageHome} />
                </Switch>
            </Container>
        </Router>
    </div>
    )
}

export default App


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

function PageUnderConstruction() {
    return (
        <div>
            <PageTitle title="UNDER CONSTRUCTION" subtitle="This page is under construction" />
        </div>
    )
}

function LogoutPage( props ) {
    const dispatch = useDispatch()

    useEffect(()=>{
        if( props.loggedIn ){
            props.loginUpdate( false )
            dispatch( resetVoter() )
        }
    }, [props, dispatch])

    return (
        <div>
            <PageTitle title="LOGOUT" subtitle="Logging you out..." />
            { !props.loggedIn && <Redirect to="/" />}
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