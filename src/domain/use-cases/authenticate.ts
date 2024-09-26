interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthenticateUsecase {
    perform(params: AuthenticateUsecase.Params): Promise<AuthenticateUsecase.Response>
}

export namespace AuthenticateUsecase {
    export type Params = {
        email: string;
        password: string;
    }

    export type Response = { user: User, token: string } | Error
}
