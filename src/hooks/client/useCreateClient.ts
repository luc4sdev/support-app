import { CreateClientService } from '@/services/client/createClientService';
import { CreateClientUsecase } from '@/domain/use-cases/client/create-client'
import { useMutation } from '@tanstack/react-query'

type CreateClientProps = CreateClientUsecase.Params

export async function createClient({ name, email, phone }: CreateClientProps) {

    const response = await CreateClientService.instance.perform({
        name,
        email,
        phone
    })
    if (response instanceof Error) throw response

    return response

}

export function useCreateClient() {
    return useMutation({
        mutationKey: ['create-client'],
        mutationFn: async (props: CreateClientProps) => createClient(props),
    })
}