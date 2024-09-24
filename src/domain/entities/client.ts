export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean | null;
}