// import User from './User';
// import Event from './Event';
// import Resource from './Resource';
// import Job from './Job';
// import Mentorship from './Mentorship';
// import ContactMessage from './ContactMessage';
// import MentorshipApplication from './MentorshipApplication';


// // Establishing associations
// // Modify associations in models/index.js

// // User associations
// User.hasMany(Event, { foreignKey: 'organizerId', as: 'organizedEvents' });
// User.hasMany(Resource, { foreignKey: 'uploadedById', as: 'uploadedResources' });
// User.hasMany(Job, { foreignKey: 'postedById', as: 'postedJobs' });
// User.hasMany(Mentorship, { foreignKey: 'mentorId', as: 'mentorships' });
// User.hasMany(MentorshipApplication, { foreignKey: 'applicantId', as: 'mentorshipApplications' }); // Add this line for MentorshipApplication

// // Mentorship associations
// Mentorship.hasMany(MentorshipApplication, { foreignKey: 'mentorshipId', as: 'applications' }); // Add this line for MentorshipApplication


// // Reverse associations
// Event.belongsTo(User, { foreignKey: 'organizerId', as: 'eventOrganizer' });
// Resource.belongsTo(User, { foreignKey: 'uploadedById', as: 'resourceUploader' });
// Job.belongsTo(User, { foreignKey: 'postedById', as: 'jobPoster' });
// Mentorship.belongsTo(User, { foreignKey: 'mentorId', as: 'mentor' });

// // Reverse associations for MentorshipApplication
// MentorshipApplication.belongsTo(User, { foreignKey: 'applicantId', as: 'applicant' });
// MentorshipApplication.belongsTo(Mentorship, { foreignKey: 'mentorshipId', as: 'mentorship' });



import User from './User';
import Event from './Event';
import Resource from './Resource';
import Job from './Job';
import Mentorship from './Mentorship';
import MentorshipApplication from './MentorshipApplication';
import ContactMessage from './ContactMessage';
import Discussion from './Discussion';

// User associations
User.hasMany(Event, { foreignKey: 'organizerId', as: 'organizedEvents' });
User.hasMany(Resource, { foreignKey: 'uploadedById', as: 'uploadedResources' });
User.hasMany(Job, { foreignKey: 'postedById', as: 'postedJobs' });
User.hasMany(Mentorship, { foreignKey: 'mentorId', as: 'mentorships' });
User.hasMany(MentorshipApplication, { foreignKey: 'applicantId', as: 'mentorshipApplications' });
User.hasMany(Discussion, { foreignKey: 'userId', as: 'discussions' }); // New association for Discussions

// Discussion associations
Discussion.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // New relationship with User

// Mentorship associations
Mentorship.hasMany(MentorshipApplication, { foreignKey: 'mentorshipId', as: 'applications' });

// Reverse associations
Event.belongsTo(User, { foreignKey: 'organizerId', as: 'eventOrganizer' });
Resource.belongsTo(User, { foreignKey: 'uploadedById', as: 'resourceUploader' });
Job.belongsTo(User, { foreignKey: 'postedById', as: 'jobPoster' });
Mentorship.belongsTo(User, { foreignKey: 'mentorId', as: 'mentor' });
MentorshipApplication.belongsTo(User, { foreignKey: 'applicantId', as: 'applicant' });
MentorshipApplication.belongsTo(Mentorship, { foreignKey: 'mentorshipId', as: 'mentorship' });

export {
  User,
  Event,
  Resource,
  Job,
  Mentorship,
  MentorshipApplication,
  ContactMessage,
  Discussion,
};


