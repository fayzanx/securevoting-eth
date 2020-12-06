pragma solidity >=0.7.0 <0.8.0;

contract SecureVote {
   
   constructor(){
       admin = msg.sender;
   }
   
    struct Voter {
        bool voted;  // if true, that person already voted
        bytes24 voted_time;
    }

    struct Candidate {
        // If you can limit the length to a certain number of bytes, 
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name;
        bytes32 party;
        string logo;
        uint voteCount;
    }
    mapping
    function addCandidate(bytes32 _name, bytes32 _party, strin _logo)
    function addVoterList()require(){
        
    }

}
