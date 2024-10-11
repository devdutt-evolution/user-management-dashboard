import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';

const userSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(2, { message: 'name must be longer that 2 characters' })
    .max(50, { message: 'name cannot be lengthier than 30' }),
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Please provide a valid email' }),
  phone: z
    .string({ message: 'Phone number is required' })
    .min(7, { message: 'please enter a valid phone number' })
    .max(15, { message: 'please enter a valid phone number' }),
});

export default function CreateUser({
  submitCallback,
}: {
  submitCallback: () => void;
}) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });
  const {
    formState: { isLoading },
  } = form;

  function onSubmit(values: z.infer<typeof userSchema>) {
    Object.assign(values, { id: Date.now() });
    localStorage.setItem('manual_user', JSON.stringify(values));
    form.reset();
    submitCallback();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='person@abc.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='user name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder='12345-12345' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='mx-auto' disabled={isLoading}>
          {!isLoading ? (
            'Submit'
          ) : (
            <LoaderCircle className='animate-spin w-5 h-5' />
          )}
        </Button>
      </form>
    </Form>
  );
}
