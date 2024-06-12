import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { gql, useMutation } from '@apollo/client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { GET_WAREHOUSES } from '@/lib/gql'

const FormSchema = z.object({
  name: z.string().min(1, 'Warehouse name is required'),
  shelves: z.array(
    z.object({
      shelfName: z.string().min(1, 'Shelf name is required'),
      zone: z.number().int().min(1).max(10, 'Zone must be between 1 and 10'),
    }),
  ),
})

const CREATE_WAREHOUSE = gql`
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
`

export default function WarehouseForm() {
  const { toast } = useToast()
  const [mutateFunction, { data, loading, error }] = useMutation(
    CREATE_WAREHOUSE,
    {
      onCompleted: () => {
        toast({
          description: 'The warehouse was created successfully',
        })
      },
      refetchQueries: [GET_WAREHOUSES, 'GetWarehouses'],
    },
  )

  if (error) {
    console.log(error)
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      shelves: [{ shelfName: '', zone: 1 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'shelves',
    control: form.control,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutateFunction({
      variables: {
        input: {
          name: data.name,
          zones: data.shelves.map(shelf => ({
            zoneNumber: shelf.zone,
            shelves: [{ name: shelf.shelfName }],
          })),
        },
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="warehouse-form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Warehouse name</FormLabel>
              <FormControl>
                <Input className="col-span-3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => (
          <div key={field.id}>
            <FormField
              control={form.control}
              name={`shelves.${index}.shelfName`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Shelf name</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`shelves.${index}.zone`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Zone</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="sm"
              variant="destructive"
              type="button"
              onClick={() => remove(index)}
              className="my-4"
            >
              Remove shelf
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          type="button"
          onClick={() => append({ shelfName: '', zone: 1 })}
        >
          Add Shelf
        </Button>
      </form>
    </Form>
  )
}
