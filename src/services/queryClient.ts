import toast from 'react-hot-toast';
import { MutationCache, QueryClient, QueryCache } from 'react-query';

export const QueryClientStore = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err: any) => {
      if (err.response.data.detail) {
        toast.error(err.response.data.detail);
      } else {
        toast.error('خطایی در سیستم رخ داده است');
      }
    }
  }),
  queryCache: new QueryCache({
    onError: (err: any) => {
      if (err.response.data.detail) {
        toast.error(err.response.data.detail);
      } else {
        toast.error('خطایی در سیستم رخ داده است');
      }
    }
  })
});
