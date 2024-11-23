import sequelize from '@/config/db';
import { DataTypes } from 'sequelize';

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailNotifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  smsNotifications: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'student', 'mentor'),
    defaultValue: 'student',
  },
}, {
  timestamps: true,
});

export default User;
