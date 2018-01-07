import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dish } from '../../providers/shared/dish';
import { Comment } from '../../providers/shared/comment';

import { FevoriteProvider } from '../../providers/fevorite/fevorite';
/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private favoriteProvider: FevoriteProvider,
              @Inject('BaseURL') private BaseURL
             ) {
            this.dish = navParams.get('dish');
            this.numcomments = this.dish.comments.length;
            this.favorite = this.favoriteProvider.isFavorite(this.dish.id);
            let total = 0;
            this.dish.comments.forEach(comment => total+= comment.rating);
            this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  
  addToFavorites(){
    console.log("Adding to favorite: ", this.dish.id);
    this.favorite = this.favoriteProvider.addFavorite(this.dish.id);
  }

}
