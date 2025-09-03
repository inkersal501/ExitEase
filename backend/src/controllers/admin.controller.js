const {adminService} = require("../services");

const getResignations = async (req, res) => { 
    try {
        const resignations = await adminService.getResignations();
        res.status(200).send(resignations);
    } catch (error) {
        res.status(500).send({"message": error.message});
    } 
};

const concludeResignation =  async (req, res) => { 
    try {
        await adminService.concludeResignation(req);
        res.status(200).send();
    } catch (error) {
        res.status(500).send({"message": error.message});
    }
};

const getExitresponse = async (req, res) => { 
    const {resignationId} = req.params;
    try {
        const exitResponse = await adminService.getExitresponse(resignationId);
        res.status(200).send(exitResponse);
    } catch (error) {
        res.status(500).send({"message": error.message});
    } 
};

module.exports = { getResignations, concludeResignation, getExitresponse };