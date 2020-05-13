import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-vue-synthetiques',
  templateUrl: './vue-synthetiques.component.html',
  styleUrls: ['./vue-synthetiques.component.scss']
})
export class VueSynthetiquesComponent implements OnInit {

  faEye = faEye;
  constructor() { }

  ngOnInit(): void {
  }

}
