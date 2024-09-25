import { UploadImageUsecase } from "@/domain/use-cases/client/upload-image"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class UploadImageService implements UploadImageUsecase {
    public static instance = new UploadImageService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: UploadImageUsecase.Params): Promise<UploadImageUsecase.Response> {
        const response = await this.requestHelper.make<UploadImageUsecase.Response>({
            url: `/client/upload/${params.id}`,
            method: 'POST',
            data: params.formData,

        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}