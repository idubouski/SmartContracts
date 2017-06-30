var UserManager = artifacts.require("./UserManager.sol");
const Storage = artifacts.require('./Storage.sol');
const StorageManager = artifacts.require('./StorageManager.sol');
const ContractsManager = artifacts.require("./ContractsManager.sol");
const MultiEventsHistory = artifacts.require("./MultiEventsHistory.sol");

module.exports = function(deployer, network) {
    deployer.deploy(UserManager, Storage.address, 'User Manager')
        .then(() => StorageManager.deployed())
        .then((_storageManager) => _storageManager.giveAccess(UserManager.address, 'User Manager'))
        .then(() => UserManager.deployed())
        .then(_manager => manager = _manager)
        .then(() => manager.init(ContractsManager.address))
        .then(() => manager.setupEventsHistory(MultiEventsHistory.address))
        .then(() => MultiEventsHistory.deployed())
        .then(_history => _history.authorize(manager.address))
        .then(() => console.log("[MIGRATION] [21] UserManager: #done"))
}
