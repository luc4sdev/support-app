
export interface GetImageUsecase {
    perform(params: GetImageUsecase.Params): Promise<GetImageUsecase.Response>
}

export namespace GetImageUsecase {
    export type Params = {
        id: string;
    }

    export type Response = string | Error
}
