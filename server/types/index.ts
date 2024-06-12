export type Shelf = {
  name: string
}

export type Zone = {
  id: string
  zoneNumber: number
  shelves: Shelf[]
}

export type Warehouse = {
  id: string
  name: string
  zones: Zone[]
}
