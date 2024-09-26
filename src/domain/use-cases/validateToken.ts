interface User {
    id: string;
    name: string;
    email: string;
}

export interface ValidateTokenUsecase {
    perform(): Promise<ValidateTokenUsecase.Response>
}

export namespace ValidateTokenUsecase {
    export type Params = {

    }
    export type Response = User | Error
}
