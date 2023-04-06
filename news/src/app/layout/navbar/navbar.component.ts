import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  toggle():void{
    console.log('da');
    const navbarLinks = document.getElementsByClassName('navbar-links')[0];
    console.log(navbarLinks);
    //toggleButton.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
    //});
  }
}
