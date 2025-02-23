const { Resignation } = require("../models");


const getResignations = async () => {
    try {
        const resignations = await Resignation.find({}, "_id employeeId lwd reason status");
        if(!resignations)
            throw new Error(`No resignations found`);
        return resignations;
    } catch (error) {
        throw new Error(`Error getting resignations: ${error.message}`);
    }
};

const concludeResignation =  async (req) => { 
    const { resignationId, approved, lwd } = req.body;
    try {
        const resignation = await Resignation.findById(resignationId);
        if(!resignation)
            throw new Error(`Resignation not found`);
        if(approved){
            resignation.status = "Approved";
            resignation.exitDate = lwd;
        } else {
            resignation.status = "Rejected";
        }
        await resignation.save();
        return true;
    } catch(error) {
        throw new Error(`Error concluding resignation: ${error.message}`);
    }
};

module.exports = { getResignations, concludeResignation };