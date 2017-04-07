import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class HttpService {
    constructor(private _http: Http) { }

    httpGet(url: string): Observable<any> {
        return this._http.get(url).map((res: Response) => res.json());
    }

    httpPost(url: string, body: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(url, body, options)
            //.map(res => res.json())
            .catch(this.handleError)

    }

    private handleError (error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('Error in retrieving news: ' + error);
        return Observable.throw(error.json().error || 'Server error');
    }

}