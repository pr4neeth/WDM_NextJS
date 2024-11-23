import sequelize from '@/config/db';
import { DataTypes } from 'sequelize';

const Discussion = sequelize.define('Discussion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: { // Updated field to establish relationship with User
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // References the User model
      key: 'id',
    },
  },
});

export default Discussion;

