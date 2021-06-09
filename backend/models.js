import Seq from "sequelize";
const { Sequelize, DataTypes, Op } = Seq; 
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


TestDataPoint.createBatch = async (name, data) => {
    if (typeof data === "object" && data != null) {
        const names = Object.keys(data).map(x => `${name}-${x}`);
        const dataPs = Object.keys(data).map(x => `${data[x]}`);
        names.forEach((x, i) => TestDataPoint.create({ type: x, data: dataPs[i] }));
    } else {
        TestDataPoint.create({ type: name, data: `${data}` });
    }
}


TestDataPoint.getUniqueNames = async () => {
    const names = (await sequelize.query('SELECT DISTINCT "type" FROM "TestDataPoints" AS "TestDataPoint"'))[0].map(x => x.type);  //maybe fix this so that I don't need an await
    return names;
}

TestDataPoint.getData = async (start, end, names) => {
    const allNames = await TestDataPoint.getUniqueNames(); 
    names = names.split(',').filter(x=>allNames.includes(x));  // sql injection protection 
    return TestDataPoint.findAll({ where: { createdAt: { [Op.lte]: end, [Op.gte]: start }, type:names }});

}

const sync = async (force=false) => await sequelize.sync({ force,alter:!force });

export default TestDataPoint; 
export {sync}; 