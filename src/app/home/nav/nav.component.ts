// Add this to your nav.component.ts
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 isDark = false;
  scrolled = false;  // Add this line
  sections: HTMLElement[] = [];
  currentSection = 0;

  ngOnInit() {
  // Initialize sections after view is ready
  setTimeout(() => {
    this.sections = [
      'home',
      'about',
      'services',
      'skills',
      'projects',
      'contact'
    ].map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  });
}
  
  // Update the onWindowScroll method in nav.component.ts
@HostListener('window:scroll', [])
onWindowScroll() {
  this.scrolled = window.scrollY > 50;
  
  if (this.sections.length === 0) return;

  const scrollPosition = window.scrollY + 100;
  
  this.sections.forEach((section, index) => {
    if (!section) return;
    
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
// Update the section where we set isDark in the onWindowScroll method
if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
  // Reverse the color scheme
  const sectionId = section.id;
  this.isDark = ['about', 'skills', 'contact',].includes(sectionId);
  
}
      
    });
  }

  // Update the scroll behavior to be smoother
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}