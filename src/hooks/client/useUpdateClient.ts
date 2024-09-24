import { UpdateClientUseCase } from '@/domain/use-cases/client/update-client'
import { UpdateClientService } from '@/services/client/updateClientService'
import { useMutation } from '@tanstack/react-query'

type UpdateClientProps = UpdateClientUseCase.Params

export async function updateClient({ id, name, email, phone }: UpdateClientProps) {

    const response = await UpdateClientService.instance.perform({
        id,
        name,
        email,
        phone
    })
    if (response instanceof Error) throw response

    return response

}

export function useUpdateClient() {
    return useMutation({
        mutationKey: ['update-client'],
        mutationFn: async (props: UpdateClientProps) => updateClient(props),
    })
}