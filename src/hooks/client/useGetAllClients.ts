import { GetAllClientsUseCase } from '@/domain/use-cases/client/get-all-clients';
import { GetAllClientsService } from '@/services/client/getAllClientsService'
import { useQuery } from '@tanstack/react-query'

type GetAllClientProps = GetAllClientsUseCase.Params;
export async function getAllClients({ pageIndex, query }: GetAllClientProps) {
  const response = await GetAllClientsService.instance.perform({ pageIndex, query })
  return response
}

export function useGetAllClients({ pageIndex, query }: GetAllClientsUseCase.Params) {
  return useQuery({
    queryKey: ['get-all-clients', pageIndex, query],
    queryFn: () => getAllClients({ pageIndex, query }),
    staleTime: 5000,
  });
}