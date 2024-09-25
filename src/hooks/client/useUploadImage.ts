import { UploadImageUsecase } from '@/domain/use-cases/client/upload-image'
import { UploadImageService } from '@/services/client/uploadImageService'
import { useMutation } from '@tanstack/react-query'

type UploadImageProps = UploadImageUsecase.Params

export async function uploadImage({ formData, id }: UploadImageProps) {

    const response = await UploadImageService.instance.perform({
        id,
        formData
    })
    if (response instanceof Error) throw response

    return response

}

export function useUploadImage() {
    return useMutation({
        mutationKey: ['upload-image'],
        mutationFn: async (props: UploadImageProps) => uploadImage(props),
    })
}