import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class HttpService {
    constructor(private _http: Http) { }

    httpGet(url: string): Observable<any> {
        return this._http.get(url).map((res: Response) => res.json());
    }

    httpPost(url: string, post: { title: string, body: string, userId: number }): Observable<any> {
        const body = JSON.stringify(post);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-urlencoded');
        return this._http.post(url, body, {
            headers: headers
        }).map(res => res.json());
    }
}