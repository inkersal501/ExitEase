const adminService = require("../services/admin.service");

const getResignations = async (req, res) => { 
    try {
        const resignations = await adminService.getResignations();
        res.status(200).send({data: resignations});
    } catch (error) {
        res.status(500).send({"message": error.message});
    } 
};

const concludeResignation =  async (req, res) => { 
    try {
        const resignation = await adminService.concludeResignation(req);
        res.status(200).send();
    } catch (error) {
        res.status(500).send({"message": error.message});
    }

};

module.exports = { getResignations, concludeResignation };