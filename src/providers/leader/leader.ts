import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';
import { Observable} from 'rxjs/Observable';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

constructor(public http: Http,
    private processHttpMsgProvider: ProcessHttpmsgProvider) {
console.log('Hello LeaderProvider Provider');
}

getLeaders(): Observable <Leader[]>{
return this.http.get(baseURL + 'leaders')
.map(res => {return this.processHttpMsgProvider.extractData(res)})
.catch(error => {return this.processHttpMsgProvider.handleError(error)});
}

getLeader(id: number): Observable<Leader>{
return this.http.get(baseURL + 'leaders/'+ id) 
.map(res => {return this.processHttpMsgProvider.extractData(res)})
.catch(error => {return this.processHttpMsgProvider.handleError(error)});
}

getFeaturedLeaders(): Observable<Leader>{
return this.http.get(baseURL + 'leaders?featured=true') 
.map(res => {return this.processHttpMsgProvider.extractData(res)[0]})
.catch(error => {return this.processHttpMsgProvider.handleError(error)});
}

}
