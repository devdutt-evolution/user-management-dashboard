import { LoaderCircle, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateUser from '../createUser';
import { useUsers } from './use-users';
import { UserCard } from './userCard';

export default function UserList() {
  const { data, open, setOpen, manualUser, setRefresh, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[100dvh]'>
        <LoaderCircle className='animate-spin w-10 h-10 text-white' />
      </div>
    );
  }

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between pb-4'>
        <h2 className='text-white/90 mb-4 text-4xl font-semibold'>Users</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className='bg-slate-200 flex gap-2 px-3 py-2 font-semibold rounded-lg'>
            <Plus className='w-6 h-6' /> User
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create User</DialogTitle>
              <DialogDescription>Add a user to the list</DialogDescription>
              <CreateUser
                submitCallback={() => {
                  setRefresh((v: number) => v + 1);
                  setOpen(false);
                }}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {data && data.length > 0 ? (
          [...data, manualUser] // if there is user coming from localstorage add that too
            .filter((u) => !!u)
            .map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p className='text-white/85 text-2xl'>No users to list</p>
        )}
      </div>
    </div>
  );
}
