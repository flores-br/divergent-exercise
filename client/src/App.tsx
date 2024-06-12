import { gql, useQuery } from '@apollo/client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import WarehouseForm from './components/WarehouseForm'
import SkeletonCard from './components/SkeletonCard'

const GET_WAREHOUSES = gql`
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

export default function App() {
  const { loading, error, data } = useQuery(GET_WAREHOUSES)

  if (error) return `Error! ${error.message}`

  return (
    <div className="min-h-screen bg-slate-600 p-3 flex flex-col justify-around items-center">
      <WarehouseForm />
      {loading && <SkeletonCard />}
      {data && (
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {data.warehouses.map(w => (
              <CarouselItem key={w.id}>
                <div className="p-1">
                  <Card className="w-380px">
                    <CardHeader>
                      <CardTitle>{w.name}</CardTitle>
                      <CardDescription>Separated by zone</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div>
                        {w.zones.map(z => (
                          <div
                            key={z.id}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                          >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-slate-700" />
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {`Zone ${z.zoneNumber}`}
                              </p>
                              <p className="text-sm text-slate-500">
                                {z.shelves.map(s => s.name).join(', ')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  )
}
