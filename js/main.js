document.querySelectorAll('.nav-menu__buttons a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.nav-menu');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade');
          entry.target.classList.remove('fade-out');
        } else {
          entry.target.classList.add('fade-out');
          entry.target.classList.remove('fade');
        }
      });
    }, { threshold: [0.5] });

    sections.forEach(section => {
      observer.observe(section);
    });
  });

    
    
    
    

    document.addEventListener('DOMContentLoaded', () => {
      const container = document.querySelector('.contenido__projects');
      const items = document.querySelectorAll('.project');
      const prevBtn = document.getElementById('flecha-izq');
      const nextBtn = document.getElementById('flecha-der');
    
      let currentIndex = 0;
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            currentIndex = Array.from(items).indexOf(entry.target);
            updateButtons();
          }
        });
      }, { threshold: 0.5, root: container });
    
      items.forEach(item => {
        observer.observe(item);
      });
    
      function updateButtons() {
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex === items.length - 1 ? 'none' : 'block';
      }
    
      function scrollToIndex(index) {
        container.scrollLeft = index * container.offsetWidth;
      }
    
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          scrollToIndex(currentIndex);
          updateButtons();
        }
      });
    
      nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
          currentIndex++;
          scrollToIndex(currentIndex);
          updateButtons();
        }
      });
    
      updateButtons(); // Initial call to set button visibility
    });
    