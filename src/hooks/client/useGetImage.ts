
import { GetImageUsecase } from '@/domain/use-cases/client/get-image'
import { GetImageService } from '@/services/client/getImageService'

import { useMutation } from '@tanstack/react-query'

type GetImageProps = GetImageUsecase.Params

export async function getImage({ id }: GetImageProps) {

    const response = await GetImageService.instance.perform({
        id,

    })
    if (response instanceof Error) throw response

    return response

}

export function useGetImage() {
    return useMutation({
        mutationKey: ['get-image'],
        mutationFn: async (props: GetImageProps) => getImage(props),
    })
}