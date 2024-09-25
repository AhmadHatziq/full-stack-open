# Run with: 
`node index.js `

Mutation operation to add new person: 
```
mutation {
  addPerson(
    name: "Pekka Mikkola"
    phone: "045-2374321"
    street: "Vilppulantie 25"
    city: "Helsinki"
  ) {
    name
    phone
    address{
      city
      street
    }
    id
  }
}
```

To view newly added person: 
```
query {
  findPerson(name: "Pekka Mikkola") {
    phone 
    address {
      city 
      street
    }
  }
}
```

To view persons with/without phone number, with the specified ENUM: 
```
query {
  allPersons(phone: YES) {
    name
  }
}

query {
  allPersons(phone: NO) {
    name
  }
}
```