
import { GetImageUsecase } from "@/domain/use-cases/client/get-image"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class GetImageService implements GetImageUsecase {
    public static instance = new GetImageService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: GetImageUsecase.Params): Promise<GetImageUsecase.Response> {
        const response = await this.requestHelper.make<GetImageUsecase.Response>({
            url: `/client/image/${params.id}`,
            method: 'GET',
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}