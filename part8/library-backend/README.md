To install and run: 
```
npm init 
npm install @apollo/server graphql
node library-backend.js 
```

Query to get dummy, bookCount and authorCount: 
```
query {
   dummy
   bookCount 
   authorCount 
}
```

Query to return all books: 
```
query {
   allBooks {
    author
    title 
    published 
    id 
    genres 
   } 
}
```

Query to return authors and their bookcounts: 
```
query {
   allAuthors {
    name 
    bookCount
   }
   } 

```

Query to return books given the author name: 
```
query {
allBooks(author: "Robert Martin") {
  title
}
}
```

Query to return books given a genre: 
```
query {
allBooks(genre: "refactoring") {
  title
  author
}
}
```

