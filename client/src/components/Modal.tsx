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

type Props = {
  title: string
}

export default function Modal({ title }: Props) {
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
          <WarehouseForm />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => {
              const warehouseForm = document.getElementById('warehouse-form')
              if (warehouseForm) {
                warehouseForm.dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true }),
                )
              }
            }}
          >
            Create warehouse
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
