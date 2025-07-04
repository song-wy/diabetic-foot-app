module.exports = (sequelize, DataTypes) => {
  const Glucose = sequelize.define('BloodGlucose', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 2.2,
        max: 33.3
      }
    },
    mealType: {
      type: DataTypes.ENUM('fasting', 'postprandial', 'random'),
      allowNull: false
    },
    recordTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    indexes: [
      {
        fields: ['patientId', 'recordTime'],
        name: 'idx_patient_time'
      }
    ]
  });

  return Glucose;
};