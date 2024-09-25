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

