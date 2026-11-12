import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-carousel-card',
    templateUrl: './carousel-card.component.html',
    styleUrls: ['./carousel-card.component.css'],
    standalone: false
})
export class CarouselCardComponent implements OnInit {
  //dawg why does this throw an error too
  @Input() resource:ResourceData;

  constructor() { }

  ngOnInit() {
  }

  getResources() {
    if (this.resource.category == "artist") {
      return "/artist/" + encodeURIComponent(this.resource.id);
    } else if (this.resource.category == "album") {
      return "/album/" + encodeURIComponent(this.resource.id);
    } else if (this.resource.category == "track") {
      return "/track/" + encodeURIComponent(this.resource.id);
    } else {
      return "#";
    }
  }
}
