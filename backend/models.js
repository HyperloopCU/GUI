const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("CUHyperloopTest", "hyperloop-test", "F2ryGyixnKBBIG8D", {
    host: '35.237.126.240',
    dialect: 'postgres'
});

// make sure the database is connected
(async () => {
    try {
        await sequelize.authenticate();
    } catch (e) {
        console.error(e);

    }
})();

const TestDataPoint = sequelize.define("TestDataPoint", {
    type: { type: DataTypes.STRING(50), allowNull: false },
    data: { type: DataTypes.TEXT(), allowNull: false },
});


TestDataPoint.createBatch = async (name,data)=>{
    if (typeof data === "object" && data != null){
        names = Object.keys(data).map(x=>`${name}-${x}`); 
        dataPs = Object.keys(data).map(x=>`${data[x]}`); 
        names.forEach((x,i) => TestDataPoint.create({type:x,data:dataPs[i]}));
    } else {
        TestDataPoint.create({type:name,data:`${data}`}); 
    }
}

const sync = async () => await sequelize.sync({ force: true });

module.exports = { sync, TestDataPoint }; 