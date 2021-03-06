import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CashService } from 'src/app/services/cash.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  currency ='';

  constructor(private storage: Storage, private cashService: CashService) { }

  ngOnInit() {
    this.storage.get('selected-currency').then(val => {
      this.currency = val;
    });
  }

  updateCurrency(){
    this.cashService.updateCurrency(this.currency);
  }

  clearData(){
    this.cashService.clearData();
  }

}
