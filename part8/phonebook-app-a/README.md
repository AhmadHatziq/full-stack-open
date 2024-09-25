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

To mutate and edit phone number: 
```
mutation {
  editNumber(
    name: "Venla Ruuska"
    phone: "999"
    
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

Combining 2 queries: 
```
query {
  personCount
  allPersons {
    name
  }
}
```

Combining 2 queries, with seperate names: 
```
query {
  havePhone: allPersons(phone: YES){
    name
  }
  phoneless: allPersons(phone: NO){
    name
  }
}
```