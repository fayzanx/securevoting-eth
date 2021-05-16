const SecureVote = artifacts.require("SecureVote");

module.exports = function (deployer) {
  deployer.deploy(SecureVote);
};
