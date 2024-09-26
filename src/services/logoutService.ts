import { LogoutUsecase } from "@/domain/use-cases/logout"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class LogoutService implements LogoutUsecase {
    public static instance = new LogoutService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(): Promise<LogoutUsecase.Response> {
        const response = await this.requestHelper.make<LogoutUsecase.Response>({
            url: '/destroy',
            method: 'POST',
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}