To initialize and run: 
- Ensure node js in installed. Can install NVM first and then the node version: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
- Install latest node version with nvm `nvm install node`
- Get node version with `node --version`

- Run with `node index.js`
This will run the backend GraphQL server. 
To interact with this, we need a frontend GraphQL client (can be done via React FE Client or POSTMAN). Can go the localhost:<port> to use the proviled Apollo client

Taken from: https://github.com/fullstack-hy2020/graphql-phonebook-backend/tree/part8-3

Install apollo client: `npm install @apollo/client graphql`

Repo contents: 
`index.js`: contains the GraphQL API code, which serves as the backend 
