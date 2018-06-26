const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
        getGames(search: String!, limit: Int): [Game]
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
    },
    type Game {
        Id: Int
        Name: String
        slug: String
        summery: String
        url: String
        coverImageUrl: String
    }
`);
