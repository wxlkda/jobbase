const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('jobtracker', 'root', 'walkda', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const jobApplications = sequelize.define('jobApplications', {
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    applicationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

jobApplications.sync(); //god knows why without this line program caused 40 errors

module.exports = jobApplications;