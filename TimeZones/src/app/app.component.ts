import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  time = new Date();
  SelectedZone = null;

  getDateByZone(timezone) {
    this.time = new Date();
    if (timezone === 'AST') {
      this.time.setHours(this.time.getHours() - 1);
    } else if (timezone === 'HST') {
      this.time.setHours(this.time.getHours() - 2);
    } else if (timezone === 'PST') {
      this.time.setHours(this.time.getHours());
    } else if (timezone === 'MST') {
      this.time.setHours(this.time.getHours() + 1);
    } else if (timezone === 'CST') {
      this.time.setHours(this.time.getHours() + 2);
    } else if (timezone === 'EST') {
      this.time.setHours(this.time.getHours() + 3);
    }
    this.SelectedZone = timezone;
  }
}
