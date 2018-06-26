const express = require('express');
const expressGraphql = require('express-graphql');

// GraphQL schema
const schema = require('./schema');
// GraphQL resolvers and mutations
const { getCourse, getCourses, updateCourseTopic } = require('./resolvers/courses');
const { getGames } = require('./resolvers/games');

const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic,
  getGames,
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', expressGraphql({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
