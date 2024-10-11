import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './components/userList';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
      <Toaster />
    </QueryClientProvider>
  );
}
