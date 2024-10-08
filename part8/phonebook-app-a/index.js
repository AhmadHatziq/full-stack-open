// Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

const typeDefs = `
  type Address {
    street: String!
    city: String! 
  }

  type Person {
    name: String!
    phone: String
    address: Address
    id: ID!
  }

  enum YesNo {
    YES 
    NO
  }

  type Query {
    personCount: Int!
    # allPersons: [Person!]!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation { 
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!    
    ): Person

    editNumber(
      name: String! 
      phone: String!
    ): Person 
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    
    allPersons: (root, args) => {

      // If phone arg is not given in query, return all persons 
      if (!args.phone) {
        return persons
      }

      // Create a filter, depending on the existence of phone field 
      const byPhone = (person) => 
        args.phone === 'YES' ? person.phone : !person.phone 

      // Return persons, depending on the phone filter 
      return persons.filter(byPhone)
    }, 

    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  }, 

  Person: {
    address: (root) => {
        if (root.street && root.city) {
            return {street: root.street, city: root.city}; 
        }
    }
  }, 

  Mutation: {
    addPerson: (root, args) => {

      // Check if person already exists. 
      if (persons.find(p => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT_FOR_NAME', 
            invalidArgs: args.name 
          }
        })
      }

      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    }, 

    editNumber: (root, args) => {
      const person = persons.find(p => p.name === args.name)
      if (!person) {
        return null
      }
  
      const updatedPerson = { ...person, phone: args.phone }

      // In the persons array, if the name matches, replace that person with updatedPerson. Replace the persons array with this new array. 
      persons = persons.map(p => p.name === args.name ? updatedPerson : p)
      
      return updatedPerson
    }, 

  }

  /*
  // Adding on fields for the default Person resolver. Everyone's street and city is hardcoded now. 
  Person: {
    street: (root) => "Manhattan",
    city: (root) => "New York"
  }
  */ 
}

// The GraphQL server takes 2 parameters. 
//  1. typeDefs - GraphQL schema 
//  2. resolvers - How the server will respond to the queries 
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

/*
    Start the server with: node index.js 
    Sample queries: 
        query {
        findPerson(name: "Arto Hellas") {
            phone 
            city 
            street
             }
        }

        // When querying allPersons, we need to specify the fields that we want. 
        // This shows how GraphQL is more efficent. We are not getting a JSON full of unwanted data. 
        query {
            allPersons{
                name
        }
        }

        // For personCount, we do not need to define any fields. Hence, there is no '{}' at the end. 
        query {
            personCount
            }

        // For findPerson, with Address 
        query {
            findPerson(name: "Arto Hellas") {
                phone 
                address {
                city 
                street
                }
            }
            }

*/