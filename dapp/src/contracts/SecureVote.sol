pragma solidity >=0.7.0 <0.8.0;
//SPDX-License-Identifier: UNLICENSED

contract SecureVote {
   
    struct Voter {
        bool voted;  // if true, that person already voted
        bool registered;
        uint16 constituency;
        uint votedTime;
    }

    struct Candidate {
        bool registered;
        string name;
        uint16 party; // party ID
        uint16 constituency;
        uint64 voteCount;
    }

    address private owner = msg.sender;

    // cnic mappings
    mapping(uint64 => Voter) voterDetails;
    mapping(uint64 => Candidate) candidateDetails;
    mapping(uint16 => uint64[]) constituencyCandidates; // cnic

    // address mappings
    mapping(address => bool) isPollingAgent; 

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier onlyPollingAgent(){
        require(isPollingAgent[msg.sender]);
        _;
    }

    modifier voterRegistered(uint64 _cnic){
        require(voterDetails[_cnic].registered);
        _;
    }

    modifier voterHasntVoted(uint64 _cnic){
        require(!voterDetails[_cnic].voted);
        _;
    }

    constructor(){
       owner = msg.sender;
    }


    function registerPollingAgent(address _paAddr) public onlyOwner {
        isPollingAgent[_paAddr] = true;
    }

    // owner will register candidates
    function registerCandidate(uint64 _cnic, string memory _name, uint16 _party, uint16 _const) public onlyOwner {
        require(!candidateDetails[_cnic].registered); // not registered already
        constituencyCandidates[_const].push(_cnic);
        candidateDetails[_cnic].registered   = true;
        candidateDetails[_cnic].name         = _name;
        candidateDetails[_cnic].party        = _party;
        candidateDetails[_cnic].constituency = _const;
        candidateDetails[_cnic].voteCount    = 0;
    }

    // get a list of candidates in a particular constituency
    function getConstituencyCandidates(uint16 _const) public view returns (uint64[] memory) {
        return constituencyCandidates[_const];
    }

    // get details, this can be moved offchain
    function getCandidateDetails(uint64 _cnic) public view returns (string memory, uint16) {
        return (candidateDetails[_cnic].name, candidateDetails[_cnic].party);
    }

    // get detailed result for a single person, as returning arrays of objects not allowed yet
    function getCandidateResults(uint64 _cnic) public view onlyOwner returns(string memory, uint16, uint64) { //name, party, votes
        return (candidateDetails[_cnic].name, candidateDetails[_cnic].party, candidateDetails[_cnic].voteCount);
    }

    // cant vote without first registering
    function registerVoter(uint64 _cnic, uint16 _const) public  onlyOwner {// Owners will register. Agents can let vote
        voterDetails[_cnic].registered = true;
        voterDetails[_cnic].constituency = _const;
    }
    
    // voting can only be done by the agents, authorized by owner
    function vote(uint64 _cnic, uint64 voted_cnic) public onlyPollingAgent voterRegistered(_cnic) voterHasntVoted(_cnic) {
        require(voterDetails[_cnic].constituency == candidateDetails[voted_cnic].constituency); //possible modifier
        voterDetails[_cnic].voted = true;
        voterDetails[_cnic].votedTime = block.timestamp;
        candidateDetails[voted_cnic].voteCount++;
    }

    // confirm winner, can be stored for record
    function winner(uint16 _const) public view onlyOwner returns (uint64 cnic_) {
        uint64 max = 0;
        uint64 winner_ = 0;
        uint64[] memory candidates = getConstituencyCandidates(_const);
        for(uint i=0;i<candidates.length;i++){
            if(candidateDetails[candidates[i]].voteCount >max){
                max = candidateDetails[candidates[i]].voteCount;
                winner_ = candidates[i];
            }
        }
        cnic_ = winner_; 
    }

}

/*  TODO
    1. Add function that returns the results of the election for a particular constituency
    2. Add cnic, constituency information for agent. Agent can't perform any actions outside the constituency
    3. Add check, agent can't be a candidate
    4. Add ownership transfer / renouncing functions.
    5. While registering candidate, check if a party is nominating more than one cadidate for a constituency
    6. Add time constraints for voting
    7. (optional) change the constituency details function to return full details once  
*/

/*
Revisted Voting Procedure:
Owner will deploy the contract and register candidates, agents and voters. Additional information for
candidates and voters will be stored off-chain. Agent logs in to the application to enable voting.
The voters will then one-by-one authenticate via fingerprint and vote using the application. At the
end of all voting sessions, owner can announce the winners. 
*/
