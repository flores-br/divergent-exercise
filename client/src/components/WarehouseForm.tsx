import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

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

const FormSchema = z.object({
  name: z.string().min(1, 'Warehouse name is required'),
  shelves: z.array(
    z.object({
      shelfName: z.string().min(1, 'Shelf name is required'),
      zone: z.number().int().min(1).max(10, 'Zone must be between 1 and 10'),
    }),
  ),
})

export default function WarehouseForm() {
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
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <FormItem>
                  <FormLabel>Shelf Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`shelves.${index}.zone`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="destructive"
              type="button"
              onClick={() => remove(index)}
              className="mt-4"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
