import { Component,OnInit,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,
          ItemSliding,ToastController,LoadingController,AlertController } from 'ionic-angular';
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
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
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
    let alert = this.alertCtrl.create({
      title: 'Confirm Title',
      message: 'Do you want to delete dish ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Delete Canceled")
          }
        },
        {
          text: 'Delete',
          handler: () =>{
            let loading=this.loadingCtrl.create({
              content: 'Deleting..',
        
            })
        
            let toast = this.toastCtrl.create({
              message: 'Dish '+id+' deleted succesfully',
              duration: 3000
            });
        
            loading.present();
            this.favoriteProvider.deleteFavorite(id)
              .subscribe(favorites => { this.favorites = favorites;
                loading.dismiss();
                toast.present();
              },
                errMess => {this.errMess = errMess;
                          loading.dismiss();});
            
          }
        }
      ]
    })

    
    alert.present();
    item.close();

  }

}
