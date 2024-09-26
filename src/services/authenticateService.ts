import { AuthenticateUsecase } from "@/domain/use-cases/authenticate"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class AuthenticateService implements AuthenticateUsecase {
    public static instance = new AuthenticateService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(params: AuthenticateUsecase.Params): Promise<AuthenticateUsecase.Response> {
        const response = await this.requestHelper.make<AuthenticateUsecase.Response>({
            url: '/authenticate',
            method: 'POST',
            data: params
        })

        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}