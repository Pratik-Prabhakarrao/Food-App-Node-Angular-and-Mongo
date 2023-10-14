import { Component } from '@angular/core';
import { User } from 'src/app/Shared/models/User';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartQuantity = 0;
  user! : User;

  constructor(private cartService: CartService, private userService: UserService){
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }

}
