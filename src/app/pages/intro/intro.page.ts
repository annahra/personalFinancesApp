import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  currency = 'eur';

  @ViewChild('slides') slides: IonSlides;

  constructor() { }

  ngOnInit() {
  }

  next(){
    this.slides.slideNext();
  }

  saveAndStart(){
    
  }

}
