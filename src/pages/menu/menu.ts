import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Dish } from '../../providers/shared/dish';
import { DishProvider} from '../../providers/dish/dish';
import { FevoriteProvider} from '../../providers/fevorite/fevorite';
import { DishdetailPage } from '../dishdetail/dishdetail';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit{

  dishes: Dish[];
  errMess: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
        private dishProvider: DishProvider,
        private favoriteProvider: FevoriteProvider,
        private toastCtrl: ToastController,
        @Inject('BaseURL') private BaseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ngOnInit(){
     this.dishProvider.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        error => this.errMess = error);
  }

  dishSelected(event, dish){
    this.navCtrl.push(DishdetailPage,{
      dish: dish
    });
  }

  addToFavorites(dish: Dish){
    console.log("Adding to favorite: ", dish.id);
    this.favoriteProvider.addFavorite(dish.id);
    this.toastCtrl.create({
      message: 'Dish '+dish.id+' added succesfully',
      duration:3000
    }).present();
  }

}
