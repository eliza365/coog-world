const maintenanceModel = require('../models/maintenanceModel.js');

exports.createMaintenance = async (req, res) => {
    try {
        const { Maintenance_Date, Maintenance_Cost, Maintenance_Type, Maintenance_Object, Maintenance_Object_ID} = req.body;

        // Validate input fields to ensure no empty values are passed
        if (!Maintenance_Date || !Maintenance_Cost || !Maintenance_Type || !Maintenance_Object || !Maintenance_Object_ID) {
            return res.status(400).json({ message: 'All fields are required. Server may be unavailable.' });
        }

        const maintenanceId = await maintenanceModel.createMaintenance(Maintenance_Date, Maintenance_Cost, Maintenance_Type, Maintenance_Object, Maintenance_Object_ID);

        if (!maintenanceId) {
            return res.status(500).json({ message: 'Failed to create maintenance record.' });
        }

        res.status(201).json({
            id: Maintenance_Date, Maintenance_Cost, Maintenance_Type, Maintenance_Object
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const maintID = req.params.id;
        const updatedData = req.body;
        const selectedMaint = {...updatedData, MaintID: maintID};
        const updatedMaint = await maintenanceModel.updateStatus(selectedMaint);
        if(!updatedMaint){
            return res.status(404).json({message: 'Maintenance not found or not updated.'});
        }
        res.status(200).json({message: 'Status updated successfully.', maintenance: updatedData});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getObjectsByType = async (req, res) => {
    try {
        const objectType = req.params.objectType; 
        const objects = await maintenanceModel.getObjectsByType(objectType);

        res.status(200).json(objects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllMaintenance = async (req, res) => {
    try {
        const maintenance = await maintenanceModel.getAllMaintenance();
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getMaintenanceInfo = async (req, res) => {
    try {
        const info = await maintenanceModel.getMaintenanceInfo();
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getMaintenanceById = async (req, res) => {
    try {
        const maintenance = await maintenanceModel.getMaintenanceById(req.params.id);
        if(!maintenance){
            return res.status(404).json({message: 'Maintenance not found'});
        }
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteAllMaintenance = async (req, res) => {
    try {
        await maintenanceModel.deleteAllMaintenance();
        res.status(200).json({message: 'All maintenance deleted successfully.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteMaintenanceById = async (req, res) => {
    try {
        await maintenanceModel.deleteMaintenanceById(req.params.id);
        res.status(200).json({message: 'Maintenance deleted successfully.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};