import { User } from './use-users';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className='border-white/35 min-w-72 max-w-96 flex items-center gap-4 p-3 border-2 rounded-lg'>
      <Avatar>
        <AvatarFallback className='font-bold text-black'>
          {user.name
            .split(' ')
            .map((a) => a.at(0))
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <p className='text-xl font-semibold text-white'>{user.name}</p>
        <p className='text-white/75 text-sm'>{user.email}</p>
        <p className='text-white/75 text-sm'>{user.phone}</p>
      </div>
    </div>
  );
};
