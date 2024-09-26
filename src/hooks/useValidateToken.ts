
import { ValidateTokenUsecase } from '@/domain/use-cases/validateToken'
import { ValidateTokenService } from '@/services/validateTokenService'
import { useMutation } from '@tanstack/react-query'

type ValidateTokenProps = ValidateTokenUsecase.Params

export async function validatetoken({ }: ValidateTokenProps) {

    const response = await ValidateTokenService.instance.perform()
    if (response instanceof Error) throw response

    return response

}

export function useValidateToken() {
    return useMutation({
        mutationKey: ['validatetoken'],
        mutationFn: async (props: ValidateTokenProps) => validatetoken(props),
    })
}