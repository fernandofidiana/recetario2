import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [NgClass, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {
  auth = inject(AuthService);
  isMenuVisible: boolean = false;
  isSubMenuVisible: boolean = false;
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  toggleSubMenu() {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
  // Escucha clics en todo el documento
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Verifica si el clic fue fuera del menú principal y el submenú
    const isMenuClick = target.closest('.toogle');
    const isSubMenuClick = target.closest('.relative'); // Asegúrate de que esto
    if (!isMenuClick && !isSubMenuClick) {
      this.isMenuVisible = false; // Cierra el menú principal
      this.isSubMenuVisible = false; // Cierra el submenú
    }
  }
}
