import { LogoutUsecase } from '@/domain/use-cases/logout'
import { LogoutService } from '@/services/logoutService'
import { useMutation } from '@tanstack/react-query'

type LogoutProps = LogoutUsecase.Params

export async function logout({ }: LogoutProps) {

    const response = await LogoutService.instance.perform()
    if (response instanceof Error) throw response

    return response

}

export function useLogout() {
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async (props: LogoutProps) => logout(props),
    })
}