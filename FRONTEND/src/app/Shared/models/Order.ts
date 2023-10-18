import { CartItem } from "./CartsItem";

export class Order{
    id!: number;
    items! : CartItem[];
    totalPrice!: number;
    name! : string;
    address!: string;
    paymentId! : string;
    status! : string;
}