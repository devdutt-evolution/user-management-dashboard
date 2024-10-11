import { useQuery } from 'react-query';
import { BASE } from '../../lib/constants';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface User {
  name: string;
  email: string;
  phone: string;
  id: number;
}

export const useUsers = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [manualUser, setManualUser] = useState<User | undefined>(undefined);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const returnStoredUser = () => {
      const item = localStorage.getItem('manual_user');
      if (item) {
        try {
          return JSON.parse(item);
        } catch (_err) {
          console.log(_err);
          return undefined;
        }
      }
      return undefined;
    };

    setManualUser(returnStoredUser());
  }, [refresh]);

  const fetchUsers = async () => {
    const response = await fetch(BASE + '/users');
    if (response.ok) {
      return (await response.json()) as User[];
    } else {
      // console.log('not ');
      throw new Error('Failed to fetch the users');
    }
  };

  const { data, isLoading } = useQuery(['users'], fetchUsers, {
    onError(err) {
      toast({
        title: 'Failed to fetch users from placeholder api',
        description: err?.message || '',
      });
    },
  });
  return { data, isLoading, open, setOpen, manualUser, setRefresh };
};
