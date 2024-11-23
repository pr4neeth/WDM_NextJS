import sequelize from '@/config/db';
import { DataTypes } from 'sequelize';
import User from './User';

const Mentorship = sequelize.define('Mentorship', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mentorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Mentorship.belongsTo(User, { foreignKey: 'mentorId', as: 'mentor' });
export default Mentorship;
