import { Client } from "@/domain/entities/client";

export interface CreateClientUsecase {
    perform(params: CreateClientUsecase.Params): Promise<CreateClientUsecase.Response>
}

export namespace CreateClientUsecase {
    export type Params = {
        name: string;
        email: string;
        phone: string;
    }

    export type Response = Client | Error
}
