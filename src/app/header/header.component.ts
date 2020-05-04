import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/auth'])
    );
  }

}
