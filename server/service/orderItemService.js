const { where } = require("sequelize");
const { OrderItem } = require("../models")

const createOrderItem = async (data, orderId) => {
    try {
        const newData = {orderId, ...data}
        console.log('newData', newData);
        
        const orderItem = await OrderItem.create(newData)
        return orderItem;
    } catch (error) {
        console.error("Error creating orderItem:", error);
        throw error;
    }
}


module.exports = {
    createOrderItem
}

