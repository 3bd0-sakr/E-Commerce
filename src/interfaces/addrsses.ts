export interface AddressI {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

export interface AddressResponse {
    status: string;
    count: number;
    data: AddressI[];
}
