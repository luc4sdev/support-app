import { AuthenticateUsecase } from '@/domain/use-cases/authenticate'
import { AuthenticateService } from '@/services/authenticateService'
import { useMutation } from '@tanstack/react-query'

type AuthenticateProps = AuthenticateUsecase.Params

export async function authenticate({ email, password }: AuthenticateProps) {

    const response = await AuthenticateService.instance.perform({
        email,
        password
    })
    if (response instanceof Error) throw response

    return response

}

export function useAuthenticate() {
    return useMutation({
        mutationKey: ['authenticate'],
        mutationFn: async (props: AuthenticateProps) => authenticate(props),
    })
}