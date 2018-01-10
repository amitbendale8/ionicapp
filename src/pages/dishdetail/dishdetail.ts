import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,
        ToastController,ActionSheetController,ModalController,
        ViewController} from 'ionic-angular';
import { Dish } from '../../providers/shared/dish';
import { Comment } from '../../providers/shared/comment';

import { FevoriteProvider } from '../../providers/fevorite/fevorite';
import { CommentPage } from '../comment/comment';
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
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private viewCtrl: ViewController,
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
    this.toastCtrl.create({
      message: 'Dish '+this.dish.id+' added succesfully',
      position:'middle',
      duration:3000
    }).present();
  }

  openActionSheet(){
    this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Add to Favorite',
          role: 'addToFavorite',
          handler: ()=>{
            this.favorite = this.favoriteProvider.addFavorite(this.dish.id);
          }
        },
        {
          text: 'Add Comment',
          role: 'addcomment',
          handler: ()=>{
            console.log("Adding comment");
            let modal= this.modalCtrl.create(CommentPage);
            modal.onDidDismiss(data => {
              let currentDate = new Date();
              data.date = currentDate.toISOString();
              this.dish.comments.push(data);
              console.log("Inside onDidDismiss");
              
            });
            modal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: ()=>{
            console.log("Cancel");
          }
        }
      ]
    }).present();
  }

  

}
