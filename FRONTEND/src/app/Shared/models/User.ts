import { Token } from "@angular/compiler";

export class User {
    id! : number;
    email! : string;
    name!: string;
    address! : string;
    token! : string;
    isAdmin! : Boolean;
}
