# securevoting-eth: Secure Electronic Voting System

An Ethereum Blockchain based Secure Voting Application for use in Pakistan's Electrocal Process.

## Development

### Pre-requisites

1. Install Node.js.
2. Install `yarn` package manager
    ```bash
    npm install -g yarn
    ```
3. Clone the repository
    ```bash
    git clone https://github.com/fayzanx/securevoting-eth.git
    cd securevoting-eth
    ```

### Ethereum DApp and Frontend
1. Install dependencies 
    ```bash
    cd dapp
    yarn
    ```

2. Start the front-end development server
    ```bash
    yarn start
    ```

3. Start ethereum blockchain development mode
    ```bash
    truffle compile
    truffle develop
    ```

### Express Server
1. Install dependencies 
    ```bash
    cd server
    yarn
    ```

2. Rename the ```.env.example``` file to ```.env``` and edit the environment variables
    ```
    PORT = //add port number here
    CONNECTION_URL = "MONGO DATABASE URL"
    ```

2. Start the server
    ```bash
    yarn start
    ```

### Starting Blockchain Network
1. Make a genesis block from puppeth. Then copy it in all nodes and initialize geth directory using it.

2. Start geth console
   ```geth --datadir ~/Dapp/ethTestL --rpc --rpcport "8777" --rpccorsdomain "*" --networkid 1900  --nodiscover --allow-insecure-unlock --unlock                "0xa8ffe634fff5d4669a277d74105f2d8e10dd50f3" --password "passwords.txt" --mine console```
   Instead of account, you can also give a txt file containing accounts. In passwords.txt, give their comma seperated passwords. In --datadir, give directory of your project folder, otherwise it may select some other and not present working directory.

3. Now add peers to make network. You can either give ```--bootnodes``` flag in command or add it manually. You can also give enode of peer to add with its ip      ```admin.addPeer("enode://ced5d2fd0fafae212e1ab761506042703201a42990946b72dd9f4643e6d194598287c856b89f548abc2abe0bbecc41f71f63fe5a6e0e91679b8e2b8a542b0cff@192.168.0.103:30303?discport=0")```
   You can check if its added by using 
   ```admin.peers```

4. Now you need to link it with truffle to do work easily. Use
   ```truffle console --network <network name>```
   When geth network is started, this command will link truffle the geth network. But before using this command, add following in networks field of truffle-config.js
   ```advanced: {
       host: "127.0.0.1",       //or any
       port: 8777,              // Custom port specified in geth --rpcport
       network_id: 1342,        // Custom network specified in geth --networkid
       gas: 5335668,            // Gas sent with each transaction (default: ~6700000)
       gasPrice: 20000000000,   // 20 gwei (in wei) (default: 100 gwei)
     },```
 5. Great! Now you can deploy your contracts.
     
### How to use Metamask in custom network

Transactions in this network can made only by the accounts that are imported in your custom network. To import them in Metamask, first open Metamask in another tab, otherwise it won't work. Then goto Metamask -> Import -> Select Json file -> Choose UTC file in ```../geth/keystore``` folder. Give password of your account and it will be imported after a while.
## Procedure

### Authorization Levels

* `AL-1` Election Management Level (Contract Owner)
* `AL-2` Polling Booth Management Level (Agent)

### Proposed flow

1. AL-1 will register candidates constituency wise and start election window
2. An AL-2 person will unlock the machine and the app with their sign in info, ethereum wallet (MetaMask)
3. The AL-2 person will then start the voting process by navigating to ```/portal```
4. The voter will now enter CNIC, verify via biometric and vote the desired candidate
5. AL-2 will end the voting process for the booth (not implemented)
6. AL-1 will generate results by navigating to ```/manage/results```
