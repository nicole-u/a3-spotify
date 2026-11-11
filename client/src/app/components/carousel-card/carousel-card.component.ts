import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-carousel-card',
    templateUrl: './carousel-card.component.html',
    styleUrls: ['./carousel-card.component.css'],
    standalone: false
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;

  constructor() { }

  ngOnInit() {
  }

  getResources() {
    if (this.resource.category == "artist") {
      return encodeURIComponent("/artist/" + this.resource.id);
    } else if (this.resource.category == "album") {
      return encodeURIComponent("/album/" + this.resource.id);
    } else if (this.resource.category == "track") {
      return encodeURIComponent("/track/" + this.resource.id);
    } else {
      return "#";
    }
  }
}
