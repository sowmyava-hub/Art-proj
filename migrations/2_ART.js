const ART = artifacts.require("ART");

module.exports = function(deployer) {
 
  deployer.deploy(ART, "art", "painting");
};
