import { useQuery } from '@apollo/client'

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
import SkeletonCard from './components/SkeletonCard'
import Modal from './components/Modal'
import { GET_WAREHOUSES } from './lib/gql'

const groupShelvesByZone = data => {
  const groupedZones = {}

  data.zones.forEach(zone => {
    if (!groupedZones[zone.zoneNumber]) {
      groupedZones[zone.zoneNumber] = []
    }
    groupedZones[zone.zoneNumber].push(...zone.shelves)
  })

  return groupedZones
}

export default function App() {
  const { loading, error, data } = useQuery(GET_WAREHOUSES)

  if (error) return `Error! ${error.message}`

  return (
    <div className="min-h-screen bg-slate-600 p-3 flex flex-col justify-center items-center gap-10">
      <Modal title="Create a warehouse" />
      {loading && <SkeletonCard />}
      {data?.warehouses ? (
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
                        {Object.entries(groupShelvesByZone(w)).map(
                          ([zoneNumber, shelves]) => (
                            <div
                              key={zoneNumber}
                              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-slate-700" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  {`Zone ${zoneNumber}`}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {shelves.map(s => s.name).join(', ')}
                                </p>
                              </div>
                            </div>
                          ),
                        )}
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
      ) : (
        <p className="text-slate-300">No warehouses found</p>
      )}
    </div>
  )
}
