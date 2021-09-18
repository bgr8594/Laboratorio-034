import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html'
})
export class ModalErrorComponent implements OnInit {
  @Input()
  error: any;
  constructor(private navParams: NavParams, private modalCtrl: ModalController) { 
  }

  ngOnInit() {}


  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
