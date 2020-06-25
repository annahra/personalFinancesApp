import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform, IonList } from '@ionic/angular';
import { CashFlowModalPage } from '../cash-flow-modal/cash-flow-modal.page';
import { CashService, Transaction, CashFlow } from 'src/app/services/cash.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  selectedCurrency ='';
  transactions: Transaction[] =[];
  cashFlow = 0;

  @ViewChild('slidingList') slidingList: IonList;

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

    await this.cashService.getTransactions().then(trans => {
      this.transactions = trans;
      console.log('transactions: ', trans);
    });

    this.updateCashflow();
  }

  async removeTransaction(i){
    this.transactions.splice(i,1);
    this.cashService.updateTransactions(this.transactions);
    await this.slidingList.closeSlidingItems();
    this.updateCashflow();
  }

  updateCashflow() {
    let result = 0;
    this.transactions.map(trans => {
      result += trans.type == CashFlow.Expense ? -trans.value : trans.value;
    });

    this.cashFlow = result;
  }
}
