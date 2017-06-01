import { Component, OnInit, ElementRef } from '@angular/core';
import { FlickrService } from '../flickr.service';
import {FormControl} from '@angular/forms';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { Photo } from '../photo';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  searchResults;
  display;
  search = "";
  searchControl = new FormControl();
  favorites = [];
  classType;

  addFavorite(photo) {
    this.favorites.push(photo);
  }

  removeFavorite(photoIndex) {
    this.favorites.splice(photoIndex, 1);
  }

  changeDisplay(display, classType) {
    this.classType = classType === "empty" ? "glyphicon-star-empty" : "glyphicon-star";
    this.display = display;
  }

  handleClass(event) {
    let classes = event.target.classList;
    let dataIndex = event.target.parentElement.attributes["data-index"].value;


    if (classes.contains('glyphicon-star-empty')) {
      classes.remove('glyphicon-star-empty');
      classes.add('glyphicon-star');
      this.addFavorite(this.searchResults[dataIndex]);
    } else {
      classes.remove('glyphicon-star');
      classes.add('glyphicon-star-empty');
      this.removeFavorite(dataIndex);
    }

    
  }



  constructor(private flickr: FlickrService, private el: ElementRef) { }

    ngOnInit() {
      // debounce keystroke events
      this.searchControl.valueChanges
        .debounceTime(1000)
        .subscribe(newValue => {
          this.search = newValue
      
          //call the service
          if (newValue.length > 0) {
            this.flickr.getData(newValue)
            .map(res => res.json())
        .subscribe( //handle the observable
          data => {
            let tempArr = [];
            data.photos.photo.forEach(photo => {
              tempArr.push(new Photo(photo.farm, photo.server, photo.id, photo.secret))
            })

            this.searchResults = tempArr;
            this.changeDisplay(this.searchResults, "empty");
          },
          err => { console.log(err)}
          );
        }    
      });
    }
}
