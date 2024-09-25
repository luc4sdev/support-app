import { Client } from "@/domain/entities/client"

export interface GetAllClientsUseCase {
    perform(params: GetAllClientsUseCase.Params): Promise<GetAllClientsUseCase.Response>
}

export namespace GetAllClientsUseCase {
    export type Params = {
        pageIndex: string;
        query: string;
    }
    export type Response = { data: Client[], total: number } | Error
}