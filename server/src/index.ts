import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v4 as uuidv4 } from 'uuid'
import type { Warehouse } from '../types'

const typeDefs = `#graphql
  type Shelf {
    name: String!
  }

  type Zone {
    zoneNumber: Int!
    shelves: [Shelf!]!
  }

  type Warehouse {
    id: ID!
    name: String!
    zones: [Zone!]!
  }

  input ShelfInput {
    name: String!
  }

  input ZoneInput {
    zoneNumber: Int!
    shelves: [ShelfInput!]!
  }

  input WarehouseInput {
    name: String!
    zones: [ZoneInput!]!
  }

  type Mutation {
    createWarehouse(input: WarehouseInput!): Warehouse!
  }

  type Query {
    warehouses: [Warehouse!]!
  }
`

const warehouses: Warehouse[] = []

const resolvers = {
  Query: {
    warehouses: () => warehouses,
  },
  Mutation: {
    createWarehouse: (_: any, { input }: { input: Warehouse }) => {
      if (warehouses.some(warehouse => warehouse.name === input.name)) {
        throw new Error(`Warehouse with name ${input.name} already exists`)
      }

      if (
        input.zones.some(zone => zone.zoneNumber < 1 || zone.zoneNumber > 12)
      ) {
        throw new Error(`Zone number must be between 1 and 12`)
      }

      // zone cannot have more than 10 shelves
      if (input.zones.some(zone => zone.shelves.length > 10)) {
        throw new Error(`Zone cannot have more than 10 shelves`)
      }

      const newWarehouse = { id: uuidv4(), ...input }
      warehouses.push(newWarehouse)
      return newWarehouse
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
