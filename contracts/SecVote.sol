pragma solidity >=0.7.0 <0.8.0;

contract SecureVote {
   
    struct Voter {
        bool voted;  // if true, that person already voted
        bytes24 voted_time;
    }

    struct Candidate {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;
        uint8 party; //hold party as code, store codes externally
        //string logo; //logo should be accessed externally
        uint voteCount;
    }

    address private owner = msg.sender;
    mapping(address => Voter) voterDetails;
    mapping(address => Candidate) candidateDetails;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    constructor(){
       owner = msg.sender;
    }

    function registerCandidate(bytes32 _name, uint8 _party) public onlyOwner {
        //TODO: decide if we should bind candidates / voters with blockchain addresses.
    }
    //function addVoterList();

}
