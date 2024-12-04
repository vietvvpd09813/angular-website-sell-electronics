const { User } = require("../models")

const getAllUser = async () => {
    try {
        const users = await User.findAll();
        
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
}

const updateStatusUser = async (id, isActive) => {
    try {
        const data = await User.update({isActive}, {
            where: {
                id
            }
        })
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

module.exports = {
    getAllUser,
    updateStatusUser
}