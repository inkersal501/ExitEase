const { Resignation } = require("../models");

const getResignations = async () => {
    try {
        const resignations = await Resignation.find({}, "_id employeeId lwd reason status").populate("employeeId", "username email");
        if(!resignations)
            throw new Error(`No resignations found`);
        return {data: resignations};
    } catch (error) {
        throw new Error(`Error getting resignations: ${error.message}`);
    }
};

const concludeResignation =  async (req) => { 
    const { resignationId, approved } = req.body;
    try {
        const resignation = await Resignation.findById(resignationId);
        if(!resignation)
            throw new Error(`Resignation not found`);
        if(approved){
            resignation.status = "Approved";
            resignation.exitDate = resignation.lwd;
        } else {
            resignation.status = "Rejected";
        }
        await resignation.save();
        return true;
    } catch(error) {
        throw new Error(`Error concluding resignation: ${error.message}`);
    }
};

const getExitresponse = async (resignationId) => {
    try {
        const exitEesponse = await Resignation.findOne({_id: resignationId, status: "Exit"}).populate("employeeId", "username email");
        if(!exitEesponse)
            throw new Error(`No Exit Responses found`);
        return exitEesponse;
    } catch (error) {
        throw new Error(`Error getting Exit Responses: ${error.message}`);
    }
};

module.exports = { getResignations, concludeResignation, getExitresponse };