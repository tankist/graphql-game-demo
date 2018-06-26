const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

// Root resolver
let coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/',
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/',
  },
];
const getCourse = ({ id }) => coursesData.filter(course => course.id === id)[0];
const getCourses = ({ topic = null }) => {
  if (topic) {
    return coursesData.filter(course => course.topic === topic);
  }
  return coursesData;
};
const updateCourseTopic = ({ id, topic }) => {
  coursesData = coursesData.map((course) => {
    if (course.id === id) {
      return Object.assign({}, course, { topic });
    }
    return course;
  });
  const [courseObject = null] = coursesData.filter(course => course.id === id);
  return courseObject;
};
const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic,
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', expressGraphql({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
