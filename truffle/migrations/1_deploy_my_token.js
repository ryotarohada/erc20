const MyToken = artifacts.require("MyToken");

const initialSupply = "1000000000000000000000000" // 100万MTKを供給

module.exports = async function (deployer) {
  console.log("deployer", deployer)
  deployer.deploy(MyToken, initialSupply);
};
