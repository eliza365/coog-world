const maintenanceController = require('../controllers/maintenanceController.js');
const express = require('express');
const maintenanceRouter = express.Router();

// create new maintenance report
maintenanceRouter.post('/create-maintenance', maintenanceController.createMaintenance);

// update status
maintenanceRouter.put('/status/:id', maintenanceController.updateStatus);

// retrieve rides (all or specific)
maintenanceRouter.get('/', maintenanceController.getAllMaintenance);
maintenanceRouter.get('/info', maintenanceController.getMaintenanceInfo);
maintenanceRouter.get('/object', maintenanceController.getMaintenanceById);
maintenanceRouter.get('/objects/:objectType', maintenanceController.getObjectsByType);

// delete rides (all or specific)
maintenanceRouter.delete('/', maintenanceController.deleteAllMaintenance);
maintenanceRouter.delete('/:id', maintenanceController.deleteMaintenanceById);


module.exports = {
    maintenanceRouter
}