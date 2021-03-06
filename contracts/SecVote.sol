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
        uint voted_time;
    }

    struct Candidate {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper. But I guess you can't use bytes32 as fixed strings
        //govtID id;
        string name;    //bytes32 name;
        uint16 party; //hold party as code, store codes externally
        uint16 constituency;
        //string logo; //logo should be accessed externally
        uint64 voteCount;
    }

    address private owner = msg.sender;

    // cnic mappings
    mapping(uint64 => Voter) voterDetails;      //No voter will want to input his/her cnic, but whatever
    mapping(uint64 => Candidate) candidateDetails;
    //mapping(uint16 => mapping(uint64 => Candidate)) candidateDetails;
    mapping(uint16 => uint64[]) constituencyCandidates; //cnic and (name?)

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

    constructor(){
       owner = msg.sender;
    }

    function registerPollingAgent(address _paAddr) public onlyOwner {
        isPollingAgent[_paAddr] = true;
    }

    function registerCandidate(uint64 _cnic, string memory _name, uint16 _party, uint16 _const) public onlyOwner {
        //TODO: decide if we should bind candidates / voters with blockchain addresses.
        constituencyCandidates[_const].push(_cnic);
        candidateDetails[_cnic].name = _name;
        candidateDetails[_cnic].party = _party;
        candidateDetails[_cnic].constituency = _const;
        candidateDetails[_cnic].voteCount = 0;
    }

    function getConstituencyCandidates(uint16 _const) public view returns (uint64[] memory) {
        return constituencyCandidates[_const];
    }

    function getCandidateName(uint64 _cnic) public view returns (string memory) { //can be handled externally.
        return candidateDetails[_cnic].name;
    }

    function registerVoter(uint64 _cnic, uint16 _const) public  onlyOwner {//Owner will register. Polling agents will only cross check identity and let him vote.
        voterDetails[_cnic].registered = true;
        voterDetails[_cnic].constituency = _const;
    }
    
    function vote(uint64 _cnic, uint64 voted_cnic) public voterRegistered(_cnic) {
        require(voterDetails[_cnic].constituency == candidateDetails[voted_cnic].constituency); //possible modifier
        voterDetails[_cnic].voted = true;
        voterDetails[_cnic].voted_time = block.timestamp;       //But some calculation will be needed since it returns current block timestamp as seconds since unix epoch
        candidateDetails[voted_cnic].voteCount++;
    }
    
    function winner(uint16 _const) public view returns(uint64 cnic_){
        uint64 max = 0;
        uint64 winner_ = 0;
        uint64[] memory candi = getConstituencyCandidates(_const);
        for(uint i=0;i<candi.length;i++){
            if(candidateDetails[candi[i]].voteCount >max){
                max = candidateDetails[candi[i]].voteCount;
                winner_ = candi[i];
            }
        }
        cnic_ = winner_; 
    }

    //https://github.com/chrisdotn/jsmnSol/blob/master/contracts/JsmnSolLib.sol
    // function registerCandidateFromSheet() public onlyOwner {  //Can't figure out how to import json
        //don't need such function in a contract. DApp can handle  this.
    // }
    
}
/*
Possible voting method:
Voter will get his constituency number from NADRA(Every constituency is mapped to a number). Every voter can vote only to candidates of his/her constituency.
In polling boaths, polling agents(one from every party) will verify if voter is registered or not and if he has already voted or not.
After verifying, polling agents will let him/her vote from a Dapp in a node/laptop.
He will fill his constituency, and cnic(only for voting record and will not be recorded against a vote). Then select symbol of selected candidate and vote complete.
*/
