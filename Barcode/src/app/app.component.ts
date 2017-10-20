import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  color = [];

  backgroundcolor() {
    for (let index = 0; index < 10; index++) {
      const num = (Math.floor(Math.random() * 8)) ;
      if (num === 1) {
        this.color.push('Blue');
      } else if (num === 2) {
        this.color.push('Red');
      } else if (num === 3) {
        this.color.push('Yellow');
      } else if (num === 4) {
        this.color.push('Orange');
      } else if (num === 5) {
        this.color.push('Green');
      } else if (num === 6) {
        this.color.push('Purple');
      } else if (num === 7) {
        this.color.push('White');
      }
    }
  }

  ngOnInit() {
    this.backgroundcolor();
  }
}
