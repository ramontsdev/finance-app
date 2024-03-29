import { useQuery } from '@tanstack/react-query';

import { categoriesService } from '../services/categories-service';

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });

  return {
    categories: data ?? [],
    isFetching,
  };
}
