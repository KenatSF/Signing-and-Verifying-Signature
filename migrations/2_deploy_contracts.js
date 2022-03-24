let my_contract = artifacts.require("VerifySignature");


module.exports = async function (deployer, network) {
    try {
        await deployer.deploy(my_contract);
    } catch (e) {
        console.log(`Error in migration: ${e.message}`);
    }
}