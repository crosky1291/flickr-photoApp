import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class FlickrService {
  API_KEY:string = "71628d8823661bec7619411d3795bd5c";
  
  getData(query) {
 
    let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&&api_key=${this.API_KEY}&text=${query}&format=json&nojsoncallback=1`
    return this.http.get(url) 
  }

  constructor(private http: Http) { }

}