import sequelize from '@/config/db';
import { DataTypes } from 'sequelize';
import User from './User';
import Mentorship from './Mentorship';

const MentorshipApplication = sequelize.define('MentorshipApplication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mentorshipId: {
    type: DataTypes.INTEGER,
    references: {
      model: Mentorship,
      key: 'id',
    },
    allowNull: false,
  },
  applicantId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  statementOfPurpose: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

export default MentorshipApplication;