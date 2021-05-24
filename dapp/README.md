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
2. Install dependencies
    ```bash
    yarn
    ```
3. Start the server
    ```bash
    yarn start
    ```

## Procedure (draft)

### Authorization Levels

* `AL-1` Election Management Level
* `AL-2` Polling Booth Management Level

### Proposed flow

1. AL-1 will register candidates constituency wise and start election window
2. An AL-2 person will unlock the machine and the app with their sign in info and biometrics
3. The AL-2 person will then start the voting process
4. The app will loop through vote screen, fingerprint confirmation, thank you screen
5. AL-2 will end the voting process for the booth
6. AL-1 will generate results