import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Dojo Mail';

   contacts: object = [
    {
      email:  'billgates@microsoft.com',
      importance: true,
      subject: 'New Windows',
      content: 'Windows XI'
    },
    {
      email:  'ada@lovelace.com',
      importance: true,
      subject: 'programming',
      content: 'Enchantress of Numbers'
    },
    {
      email:  'John@carmac.com',
      importance: false,
      subject: 'Updated Algo',
      content: 'New Algorithm for Shadow Volumes'
    },
    {
      email:  'globe@newel.com',
      importance: false,
      subject: 'programming',
      content: 'Enchantress of Numbers'
    }
  ];
}

