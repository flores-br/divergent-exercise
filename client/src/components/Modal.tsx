import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import WarehouseForm from './WarehouseForm'
import { useState } from 'react'

type Props = {
  title: string
}

export default function Modal({ title }: Props) {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Form to create a new warehouse.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <WarehouseForm setLoading={setLoading} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            onClick={() => {
              const warehouseForm = document.getElementById('warehouse-form')
              if (warehouseForm) {
                warehouseForm.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true }),
                )
              }
            }}
          >
            {loading ? 'Creating...' : 'Create warehouse'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
