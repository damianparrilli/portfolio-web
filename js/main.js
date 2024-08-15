const popupOpen = document.getElementById("popup-open");
const popupClose = document.getElementById("popup-close");
const botones = document.querySelector(".nav-menu__buttons");

function adjustHeight() {
  const viewportHeight = window.innerHeight;
  document.querySelectorAll('.nav-menu').forEach(el => {
    el.style.height = `${viewportHeight}px`;
  });
}

window.addEventListener('resize', adjustHeight);

let loader = bodymovin.loadAnimation({
  container: document.getElementById('loader'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: './js/loader.json'
});

let animation = bodymovin.loadAnimation({
  container: document.getElementById('animacion'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: './js/animacion.json'
});

animation.addEventListener('DOMLoaded', function () {
  const loaderDiv = document.querySelector(".loader-div");
  loaderDiv.classList.add("loaded");
  loader.stop();
  adjustHeight();
  setTimeout(() => {
    loaderDiv.remove();
  }, 1000);
});




document.addEventListener('DOMContentLoaded', () => {

  const containerDiv = document.querySelector(".container");

  const sections = document.querySelectorAll('.nav-menu');
const botones = document.querySelector(".nav-menu__buttons");
let observerActive = true; 

const observerFade = new IntersectionObserver((entries) => {
  if (observerActive) { 
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade');
        entry.target.classList.remove('fade-out');
        if (entry.target.id === 'banner') {
          animation.play();
        }
      } else {
        entry.target.classList.add('fade-out');
        entry.target.classList.remove('fade');
        if (entry.target.id === 'banner') {
          animation.stop();
        }
      }
    });
  }
}, { threshold: [0.5], rootMargin: '0px 0px -20px 0px' });

sections.forEach(section => {
  observerFade.observe(section);
});

document.querySelectorAll('.nav-menu__buttons a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      observerActive = false;

      sections.forEach(section => {
        section.classList.add('fade-out');
        section.classList.remove('fade');
      });

      targetElement.classList.add('fade');
      targetElement.classList.remove('fade-out');

      containerDiv.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });

      setTimeout(() => {
        observerActive = true;
      }, 500); 

      botones.classList.remove("active");
    }
  });
});


  const container = document.querySelector('.contenido__projects');
  const items = document.querySelectorAll('.project');
  const prevBtn = document.getElementById('flecha-izq');
  const nextBtn = document.getElementById('flecha-der');

  let currentIndex = 0;

  const observerArrow = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentIndex = Array.from(items).indexOf(entry.target);
        updateButtons();
      }
    });
  }, { threshold: 0.5, root: container });

  items.forEach(item => {
    observerArrow.observe(item);
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

  updateButtons();

  function about() {
    if (window.innerWidth <= 900) {
      const back = document.getElementById('back');

      // Crear un nuevo observador de intersección
      const observerAbout = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            back.classList.add('visible');
          } else {
            back.classList.remove('visible');
          }
        });
      }, {
        threshold: 0.1  // Ajusta este valor según la visibilidad deseada
      });

      // Observar el elemento
      observerAbout.observe(back);
    } else {
      back.classList.remove('visible');
    }
  }

  about();

  window.onresize = about;
});




popupOpen.addEventListener("click", () => {
  botones.classList.add("active");
});

popupClose.addEventListener("click", () => {
  botones.classList.remove("active");
});




const galeria = document.querySelectorAll('.galeria');
const styletile = document.querySelectorAll('.styletile');
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const closeBtn = document.querySelector('.popup-close');
const prevBtn = document.querySelector('.popup-prev');
const nextBtn = document.querySelector('.popup-next');

let currentGallery = null;
let currentIndex = 0;

galeria.forEach(gallery => {
  gallery.addEventListener('click', (event) => {
    if (event.target.classList.contains('galeria__img')) {
      currentGallery = gallery;
      currentIndex = parseInt(event.target.dataset.index);
      openPopup(event.target.src);
    }
  });
});

styletile.forEach(styletiles => {
  styletiles.addEventListener('click', (event) => {
    if (event.target.classList.contains('styletile__img')) {
      currentGallery = styletiles;
      currentIndex = parseInt(event.target.dataset.index);
      openPopup(event.target.src);
    }
  });
});

function openPopup(imageSrc) {
  popupImage.src = imageSrc;
  popup.classList.add('active');
}

closeBtn.addEventListener('click', () => {
  popup.classList.remove('active');
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentGallery.children.length - 1;
  updatePopupImage();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex < currentGallery.children.length - 1) ? currentIndex + 1 : 0;
  updatePopupImage();
});

function updatePopupImage() {
  popupImage.src = currentGallery.children[currentIndex].src;
}

popupImage.addEventListener('click', () => {
  window.open(popupImage.src, '_blank');
});
