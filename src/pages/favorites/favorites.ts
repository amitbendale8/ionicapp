import { Component,OnInit,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ItemSliding } from 'ionic-angular';
import { FevoriteProvider} from '../../providers/fevorite/fevorite';
import { Dish } from '../../providers/shared/dish';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit{
  favorites: Dish[];
  errMess: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteProvider: FevoriteProvider,
    @Inject('BaseURL') private BaseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ngOnInit(){
    console.log("inside ngOnInit ");
    this.favoriteProvider.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
              errMess => this.errMess = errMess);
  }

  deleteFavorite(item: ItemSliding, id: number){
    console.log(" Deleting: "+id);
    this.favoriteProvider.deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
        errMess => this.errMess = errMess);
    item.close();

  }

}
