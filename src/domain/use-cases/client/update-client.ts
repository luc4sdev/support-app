import { Client } from "@/domain/entities/client";

export interface UpdateClientUseCase {
    perform(params: UpdateClientUseCase.Params): Promise<UpdateClientUseCase.Response>
}

export namespace UpdateClientUseCase {
    export type Params = {
        id: string;
        name?: string;
        email?: string;
        phone?: string | null;
    }

    export type Response = Client | Error
}
