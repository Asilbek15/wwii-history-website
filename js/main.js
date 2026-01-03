// WW2 History Website - Main JavaScript
// Interactive features and navigation

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  initMobileMenu();
  
  // Back to top button
  initBackToTop();
  
  // Smooth scroll for anchor links
  initSmoothScroll();
  
  // Animate elements on scroll
  initScrollAnimations();
  
  // Active navigation highlighting
  initActiveNavigation();
});

// Mobile Menu
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.textContent = '☰';
      });
    });
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with animate class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // Observe cards and grid items
  document.querySelectorAll('.year-card, .topic-card, .leader-card, .battle-item, .event-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
}

// Active Navigation
function initActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.main-nav a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Timeline year navigation
function navigateToYear(year) {
  window.location.href = `pages/${year}.html`;
}

// Search functionality (for future implementation)
function searchSite(query) {
  const pages = [
    { title: '1939 - The War Begins', url: 'pages/1939.html', keywords: ['poland', 'invasion', 'blitzkrieg', 'september'] },
    { title: '1940 - The Fall of France', url: 'pages/1940.html', keywords: ['france', 'dunkirk', 'battle of britain', 'blitz'] },
    { title: '1941 - Global Conflict', url: 'pages/1941.html', keywords: ['pearl harbor', 'barbarossa', 'soviet union', 'america'] },
    { title: '1942 - The Tide Turns', url: 'pages/1942.html', keywords: ['stalingrad', 'midway', 'el alamein', 'guadalcanal'] },
    { title: '1943 - Allied Advances', url: 'pages/1943.html', keywords: ['italy', 'sicily', 'kursk', 'tehran'] },
    { title: '1944 - Liberation', url: 'pages/1944.html', keywords: ['d-day', 'normandy', 'paris', 'bulge'] },
    { title: '1945 - Victory', url: 'pages/1945.html', keywords: ['berlin', 'hiroshima', 'surrender', 'atomic'] },
    { title: 'The Holocaust', url: 'pages/holocaust.html', keywords: ['genocide', 'concentration', 'auschwitz', 'jews'] },
    { title: 'Major Battles', url: 'pages/battles.html', keywords: ['battle', 'combat', 'war', 'military'] },
    { title: 'Key Leaders', url: 'pages/leaders.html', keywords: ['hitler', 'churchill', 'roosevelt', 'stalin'] }
  ];
  
  const results = pages.filter(page => {
    const searchTerms = query.toLowerCase();
    return page.title.toLowerCase().includes(searchTerms) ||
           page.keywords.some(kw => kw.includes(searchTerms));
  });
  
  return results;
}

// Utility: Format numbers with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Utility: Create element with classes
function createElement(tag, classes, content) {
  const el = document.createElement(tag);
  if (classes) el.className = classes;
  if (content) el.innerHTML = content;
  return el;
}

// Console welcome message
console.log('%c World War II History ', 'background: #c9a227; color: #0a0a0a; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c September 1, 1939 - September 2, 1945 ', 'color: #888; font-style: italic;');
