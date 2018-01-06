import { Component,OnInit,Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Dish } from '../../providers/shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import {Promotion } from '../../providers/shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Leader } from '../../providers/shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMessage: string;
  promoErrMessage: string;
  leaderErrMessage: string;

  constructor(public navCtrl: NavController,
        private dishProvider: DishProvider,
        private promotionProvider: PromotionProvider,
        private leaderProvider: LeaderProvider,
        @Inject('BaseURL') private BaseURL) {

  }

  ngOnInit() {
    this.dishProvider.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
              errmess => this.dishErrMessage = <any>errmess);
    this.promotionProvider.getFeaturedPromotions()
    .subscribe(promotion => this.promotion = promotion,
            errmess => this.promoErrMessage = <any>errmess);
    this.leaderProvider.getFeaturedLeaders()
    .subscribe(leader => this.leader = leader,
            errmess => this.leaderErrMessage = <any>errmess);
  }

}
