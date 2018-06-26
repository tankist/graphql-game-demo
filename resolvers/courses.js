// Reading data
let coursesData = require('./courses.json');

module.exports.getCourse = ({ id }) => coursesData.filter(course => course.id === id)[0];

module.exports.getCourses = ({ topic = null }) => {
  if (topic) {
    return coursesData.filter(course => course.topic === topic);
  }
  return coursesData;
};

module.exports.updateCourseTopic = ({ id, topic }) => {
  coursesData = coursesData.map((course) => {
    if (course.id === id) {
      return Object.assign({}, course, { topic });
    }
    return course;
  });
  const [courseObject = null] = coursesData.filter(course => course.id === id);
  return courseObject;
};
