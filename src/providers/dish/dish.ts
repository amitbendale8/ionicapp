import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { Observable} from 'rxjs/Observable';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';


/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: Http,
            private processHttpMsgProvider: ProcessHttpmsgProvider) {
    console.log('Hello DishProvider Provider');
  }

  getDishes(): Observable <Dish[]>{
    return this.http.get(baseURL + 'dishes')
      .map(res => {return this.processHttpMsgProvider.extractData(res)})
      .catch(error => {return this.processHttpMsgProvider.handleError(error)});
  }

  getDish(id: number): Observable<Dish>{
    return this.http.get(baseURL + 'dishes/'+ id) 
    .map(res => {return this.processHttpMsgProvider.extractData(res)})
    .catch(error => {return this.processHttpMsgProvider.handleError(error)});
  }

  getFeaturedDish(): Observable<Dish>{
    return this.http.get(baseURL + 'dishes?featured=true') 
    .map(res => {return this.processHttpMsgProvider.extractData(res)[0]})
    .catch(error => {return this.processHttpMsgProvider.handleError(error)});
  }

}
