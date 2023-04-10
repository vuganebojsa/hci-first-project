import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router){

  }
  toggle():void{
    console.log('da');
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    console.log(navbarLinks);
    //toggleButton.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
    //});
  }
  goToHome():void{
    this.router.navigate(['/home']);
  }
}
