import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
    standalone: false
})
export class CarouselComponent implements OnInit {
  //why does it always throw errors unless i assign them null values what is this
	@Input() carouselId:string = "";
	@Input() resources:ResourceData[] = [];

  constructor() { }

  ngOnInit() {
  }

  get carouselIdForBinding():string {
    return '#' + this.carouselId;
  }

}
