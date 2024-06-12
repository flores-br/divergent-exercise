import { gql } from '@/__generated__'

export const GET_WAREHOUSES = gql(/* GraphQL */ `
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
`)

export const CREATE_WAREHOUSE = gql(/* GraphQL */ `
  mutation CreateWarehouse($input: WarehouseInput!) {
    createWarehouse(input: $input) {
      name
      zones {
        zoneNumber
        shelves {
          name
        }
      }
    }
  }
`)
