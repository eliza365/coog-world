const maintenanceController = require('../controllers/maintenanceController.js');
const express = require('express');
const maintenanceRouter = express.Router();

// create new rides
maintenanceRouter.post('/', maintenanceController.createMaintenance);

// retrieve rides (all or specific)
maintenanceRouter.get('/', maintenanceController.getAllMaintenance);
maintenanceRouter.get('/:id', maintenanceController.getMaintenanceById);

// delete rides (all or specific)
maintenanceRouter.delete('/', maintenanceController.deleteAllMaintenance);
maintenanceRouter.delete('/:id', maintenanceController.deleteMaintenanceById);


module.exports = {
    maintenanceRouter
}