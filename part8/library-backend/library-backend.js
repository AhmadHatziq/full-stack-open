const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Book {
    title: String! 
    published: Int! 
    author: String! 
    id: ID! 
    genres: [String!]!
  }

  type Author {
    name: String!
    bookCount: Int
  }

  type AuthorBorn {
    name: String! 
    id: ID!
    born: Int 
  }

  type Query {
    dummy: Int
    bookCount: Int! 
    authorCount: Int! 
    allBooks(author: String, genre: String): [Book!]! 
    allAuthors: [Author]! 
  }

  type Mutation { 
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String! 
      setBornTo: Int! 
    ): AuthorBorn
  }

`

const resolvers = {
  Query: {
    dummy: () => 0, 
    bookCount: () => books.length, 
    authorCount: () => authors.length, 
    allBooks: (root, args) => {
        let finalBooks = books 
        if (args.author) {
            finalBooks = finalBooks.filter(book => args.author === book.author)
        }

        if (args.genre) {
            finalBooks = finalBooks.filter(book => book.genres.includes(args.genre) )
        }

        return finalBooks 
    }, 
    allAuthors: (root, args) => {

        // Get list of authors from books and authors 
        const bookAuthors = [...new Set(books.map(book => book.author))]
        const authorNames = [... new Set(authors.map(author => author.name))]
        const allAuthorNames = [...new Set([...bookAuthors, ...authorNames])]
        console.log("Author names: ", allAuthorNames)

        // Return author name with book count 
        const allAuthorsObject = allAuthorNames.map(author => ({
            name: author, 
            bookCount: books.filter(book => book.author === author).length
        }))
        console.log("allAuthors result: ", allAuthorsObject)
        return allAuthorsObject

    }, 

  }, 
  Mutation: {
    addBook: (root, args) => {
        // check to see if author is in. If not, add author to list. 
        const authorNames = new Set(authors.map(author => author.name))
        if (!authorNames.has(args.author)) {
            const newAuthor = {
                name: args.author, 
                id: uuid(), 
                born: null 
            }
            console.log("Adding new author: ", newAuthor)
            authors = authors.concat(newAuthor)
        }

        // Add book into list 
        const newBook = { ...args, id: uuid() }
        console.log("Adding new book: ", newBook)
        books = books.concat(newBook)
        return newBook 
    }, 
    editAuthor: (root, args) => {
        // Check to see if author exists. 
        const authorNames = new Set(authors.map(author => author.name))
        if (!authorNames.has(args.name)) {
            console.log("Author does not exist: ", args.name)
            return null 
        }

        // Edit age of author 
        console.log("Updating author ", args.name, " age to ", args.setBornTo)
        const authorIndex = authors.findIndex(author => author.name == args.name)
        let updatedAuthor = {...authors[authorIndex], born: args.setBornTo}
        authors[authorIndex] = updatedAuthor

        console.log("Author list: ", authors)

        return authors[authorIndex]
    }
}, 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})