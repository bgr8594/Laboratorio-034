import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-segment-button',
  templateUrl: './segment-button.page.html',
  styleUrls: ['./segment-button.page.scss'],
})
export class SegmentButtonPage implements OnInit {
  
  ngOnInit(): void {
    
  }

  constructor(){

  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}