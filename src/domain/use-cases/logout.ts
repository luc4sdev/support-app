export interface LogoutUsecase {
    perform(params: LogoutUsecase.Params): Promise<LogoutUsecase.Response>
}

export namespace LogoutUsecase {
    export type Params = {

    }

    export type Response = void | Error
}
