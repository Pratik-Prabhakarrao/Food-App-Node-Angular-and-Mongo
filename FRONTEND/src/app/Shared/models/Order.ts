import { LatLng } from "leaflet";
import { CartItem } from "./CartsItem";

export class Order{
    id!: number;
    items! : CartItem[];
    totalPrice!: number;
    name! : string;
    address!: string;
    addressLatLng?:LatLng
    paymentId! : string;
    status! : string;
}