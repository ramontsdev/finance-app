import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '../../infra/categories-service';

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.loadCategories,
  });

  return {
    categories: data ?? [],
    isFetching,
  };
}
