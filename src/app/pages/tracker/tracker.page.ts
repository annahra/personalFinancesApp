import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CashFlowModalPage } from '../cash-flow-modal/cash-flow-modal.page';
import { CashService } from 'src/app/services/cash.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  selectedCurrency ='';
  transactions =[];

  constructor(private modalCtrl: ModalController, private cashService: CashService,
      private plt: Platform, private storage: Storage) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.plt.ready();
    this.loadTransactions();
  }

  async addCashflow() {
    let modal = await this.modalCtrl.create({
      component: CashFlowModalPage,
      cssClass: 'modalCSS'
    });
    modal.present();
    modal.onDidDismiss().then(res => {
      if(res && res.data) {
        this.loadTransactions();
      }
    })
  }

  async loadTransactions(){
    await this.storage.get('selected-currency').then(currency => {
      this.selectedCurrency = currency.toUpperCase();
    });

    this.cashService.getTransactions().then(trans => {
      this.transactions = trans;
      console.log('transactions: ', trans);
    });
  }

}
