import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  ngOnInit() {
    if (localStorage.getItem('client') === null) {
      this.logout();
    }
  }

  constructor(private breakpointObserver: BreakpointObserver, private commonService: CommonService, private router: Router) { }
  logout() {
    console.log(localStorage.getItem('client'));
    localStorage.removeItem('client');
    console.log(localStorage.getItem('client'));
    this.router.navigate(['/login']);
  }
}
