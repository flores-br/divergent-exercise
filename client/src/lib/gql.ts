import { gql } from '@apollo/client'

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      zones {
        id
        zoneNumber
        shelves {
          name
        }
      }
    }
  }
`
