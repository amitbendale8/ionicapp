import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment: FormGroup;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private viewCtrl: ViewController,
    private formBuilder: FormBuilder) {

      this.comment = this.formBuilder.group({
        author: ['',Validators.required],
        rating: 1,
        comment: '',
        dateTime: ''
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  onSubmit(){
    console.log("Form Submitted");
    console.log(this.comment.value);
    let data = this.comment.value;
    this.viewCtrl.dismiss(data);
  }

}
