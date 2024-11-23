import sequelize from '@/config/db';
import { DataTypes } from 'sequelize';
import User from './User';

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fileURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadedById: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

// Resource.belongsTo(User, { foreignKey: 'uploadedById', as: 'uploader' });
export default Resource;
