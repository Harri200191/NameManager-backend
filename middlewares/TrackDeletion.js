const fs = require('fs/promises'); 

const flagFilePath = './backend/database-cleared.flag';
const getflagFilePath = () => {
    return flagFilePath;
};
  
  // Export a setter function to update the shared value
const setflagFilePath = (value) => {
  flagFilePath = value;
};

const checkDatabaseCleared = async (req, res, next) => {
    try {
      await fs.access(flagFilePath);
      return res.status(200).json({ message: 'Database already cleared.' });
    } catch (err) {
      next();
    }
};

module.exports = {
  checkDatabaseCleared, 
  getflagFilePath, 
  setflagFilePath
};