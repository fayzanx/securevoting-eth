pragma solidity >=0.7.0 <0.8.0;

//Found the mapping solution i was trying to do
//https://ethereum.stackexchange.com/questions/58637/how-are-double-mappings-indexed

contract SecureVote {

    // struct govtID { // government issued ID
    //     uint64 CNICnum; // cnic number
    // }
   //function addVoterList();
   
    struct Voter {
        //govtID id;
        bool voted;  // if true, that person already voted
        bool registered;
        uint16 constituency;
        bytes24 voted_time;
    }

    struct Candidate {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytssses1 to bytes32 because they are much cheaper
        //govtID id;
        bytes32 name;
        uint16 party; //hold party as code, store codes externally
        uint16 constituency;
        //string logo; //logo should be accessed externally
        uint voteCount;
    }

    address private owner = msg.sender;

    // cnic mappings
    mapping(uint64 => Voter) voterDetails;      //No voter will want to input his/her cnic, but whatever
    mapping(uint64 => Candidate) candidateDetails;

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

    modifier voterRegistered(){
        require(voterDetails[_cnic].registered);
        _;
    }

    constructor(){
       owner = msg.sender;
    }

    function registerPollingAgent(address _paAddr) public onlyOwner {
        isPollingAgent[_paAddr] = true;
    }

    function registerCandidate(uint64 _cnic, bytes32 _name, uint16 _party, uint16 _const) public onlyOwner {
        //TODO: decide if we should bind candidates / voters with blockchain addresses.
        candidateDetails[_cnic].name = _name;
        candidateDetails[_cnic].party = _party;
        candidateDetails[_cnic].constituency = _const;
        candidateDetails[_cnic].voteCount = 0;
    }
    
    //https://github.com/chrisdotn/jsmnSol/blob/master/contracts/JsmnSolLib.sol
    function registerCandidateFromSheet() public onlyOwner {  //Can't figure out how to import json
        
    }
    

    function registerVoter(uint64 _cnic) public  onlyOwner {//Owner will register. Polling agents will only cross check identity and let him vote.
        voterDetails[_cnic].registered = true;
    }
    
    function vote(uint64 _cnic, uint16 _const, uint64 voted_cnic) public voterRegistered {
        candidateDetails[voted_cnic].voteCount++;
        voterDetails[_cnic].voted = true;
        voterDetails[_cnic].voted_time = now;       //But some calculation will be needed since it returns current block timestamp as seconds since unix epoch
    }
    
}
