const inventoryModel = require('../models/inventoryModel.js');

exports.createUnit = async (req, res) => {
    try {
        const {item_type, item_name, item_quantity, unit_price, restocked_last, reorder_level, created_date, created_by, last_updated, updated_by} = req.body;
        const inventoryId = await inventoryModel.createUnit(item_type, item_name, item_quantity, unit_price, restocked_last, reorder_level, created_date, created_by, last_updated, updated_by);
        res.status(201).json({id: inventoryId, item_type, item_name, item_quantity, unit_price, restocked_last, reorder_level, created_date, created_by, last_updated, updated_by});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getAllInventory = async (req, res) => {
    try {
        const inv = await inventoryModel.getAllInventory();
        res.status(200).json(inv);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getInventoryInfo = async (req, res) => {
    try {
        const info = await inventoryModel.getInventoryInfo();
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteAllInventory = async (req, res) => {
    try {
        await inventoryModel.deleteAllInventory();
        res.status(200).json({message: 'Whole inventory successfully deleted.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteUnitById = async (req, res) => {
    try {
        await inventoryModel.deleteUnitById(req.params.id);
        res.status(200).json({message: 'Unit deleted successfully.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getAllAvailableItems = async (req, res) => {
    try {
        const merch = await inventoryModel.getAllAvailableItems();
        res.status(200).json(merch);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};