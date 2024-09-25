
export interface UploadImageUsecase {
    perform(params: UploadImageUsecase.Params): Promise<UploadImageUsecase.Response>
}

export namespace UploadImageUsecase {
    export type Params = {
        id: string;
        formData: FormData;
    }

    export type Response = void | Error
}
