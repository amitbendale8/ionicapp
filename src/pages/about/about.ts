import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Leader } from '../../providers/shared/leader';
import { LeaderProvider } from '../../providers/leader/leader'

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit{
  leaders: Leader[];
  errMess: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
            private leaderProvider: LeaderProvider,
            @Inject('BaseURL') private BaseURL) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ngOnInit(){
    console.log("On Init Started");
    this.leaderProvider.getLeaders().subscribe
    (leaders => {console.log("function called");
                console.log(leaders.length);
      this.leaders = leaders},
    errMess => this.errMess = errMess
    )
  }

}
