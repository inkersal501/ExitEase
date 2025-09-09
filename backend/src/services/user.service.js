const {User, Resignation} = require("../models");
const checkIfHoliday = require("./holiday.service");
const moment = require("moment");

const register = async (req) => {
  const { email } = req; 
  const checkEmail = await User.findOne({email});
  if(checkEmail) 
    throw new Error("Email Id already exists.");
  
  return await User.create({...req, role: "Employee"});    
}

const resign = async (req) => {
  // console.log(req.user);
  const user = await User.findById(req.session.userId);
  const {lwd, reason} = req.body; 
 
  const lastWorkingDay = moment(lwd, "YYYY-MM-DD");
  const dayOfWeek = lastWorkingDay.isoWeekday();
  if (dayOfWeek === 6 || dayOfWeek === 7) 
    throw new Error(`Last working day cannot be on a weekend`);
  
  const isHoliday = await checkIfHoliday(lastWorkingDay); 
  if (isHoliday) 
    throw new Error(`Last working day cannot be a holiday in India`);
  
  try {
      const resignCreate = await Resignation.create({employeeId: user._id, lwd, reason});
      return {
          "data": {
            "resignation": {
              "_id": resignCreate._id
            }
          }
        };      
  } catch (error) {
      throw new Error(`Resignation Submission Failed: ${error.message}`);
  }  
};

const checkResign = async (employeeId) => {
  try {
    const result = await Resignation.findOne({employeeId}).sort({createdAt: -1});     
    return result ? {submitted: true, status: result.status, resignationId: result._id} : {submitted: false};
  } catch (error) {
    throw new Error(`Failed: ${error.message}`);
  }
};

const responses = async (req) => {
  const {responses, resignationId} = req.body;
  const resignation = await Resignation.findById(resignationId);
  if(!resignation)
    throw new Error('Resignation not found');
   
  resignation.responses = responses;
  resignation.status = "Exit";
  await resignation.save();
  return true;
};

module.exports = {register, resign, checkResign, responses};