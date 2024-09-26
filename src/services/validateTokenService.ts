
import { ValidateTokenUsecase } from "@/domain/use-cases/validateToken"
import { RequestHelper, RequestHelperInterface } from "@/utils/helpers/request-helper"

export class ValidateTokenService implements ValidateTokenUsecase {
    public static instance = new ValidateTokenService()

    constructor(
        private readonly requestHelper: RequestHelperInterface = RequestHelper.instance
    ) { }

    async perform(): Promise<ValidateTokenUsecase.Response> {
        const token = getCookie('token');

        const response = await this.requestHelper.make<ValidateTokenUsecase.Response>({
            url: '/validate-token',
            method: 'POST',
            data: { token }
        })
        if ('error' in response) {
            return response.error
        }

        return response.body
    }
}
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

