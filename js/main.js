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


  setTimeout(() => {
    sections.forEach(section => {
      if (section.classList.contains('lazy')) {
        section.classList.remove('lazy');
      }
    });
    document.body.style.pointerEvents = "auto";
  }, 1000);



  const botones = document.querySelector(".nav-menu__buttons");
  let observerActive = true;

  const observerFade = new IntersectionObserver((entries) => {
    if (observerActive) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sections.forEach(section => {
            section.classList.add('fade-out');
            section.classList.remove('fade');
          });
          entry.target.classList.add('fade');
          entry.target.classList.remove('fade-out');

          if (entry.target.id === 'banner') {
            animation.play();
          }
        } else {
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



const userLanguage = navigator.language || navigator.userLanguage;

if (!userLanguage.startsWith('es')) {
  const frontTexto = document.querySelector('.front__texto');
  frontTexto.innerHTML = `
       <span class="front__texto__text"><b>First name:</b> Damián Alen</span>
       <span class="front__texto__text"><b>Last name:</b> Parrilli</span>
       <span class="front__texto__text"><b>Nacionality:</b> Argentine</span>
       <span class="front__texto__text"><b>Age:</b> 24</span>
      <span class="front__texto__text"><b>Date of birth:</b> 02/25/2000</span>
      <span class="front__texto__indentity">Identity card</span>
    `;

  const telefonoBack = document.getElementById('telefono-back');
  const cvBack = document.querySelector('.back__texto__button');
  telefonoBack.innerHTML = `<b>Phone:</b> +54 1160518730`;
  cvBack.innerHTML = `My CV`;
  cvBack.setAttribute('href', 'https://drive.google.com/file/d/1JEBJJaP-iBpOOlxJwlGmlGuh_3bYTmwh/view?usp=sharing');

  const aboutDescription = document.querySelector('.about-descripcion');
  aboutDescription.textContent = `Graduate in Multimedia Design. I am passionate about the design and development of web interfaces, and I am looking to grow by acquiring new knowledge that allows for greater professional development. I am interested in the creation of web platforms as a solution to user experience problems, with the commitment to generate functional, innovative and efficient interfaces. I have teamwork skills and adaptability to change. I am prepared to face new challenges that allow me to continue advancing in my professional career.`;

  const formacion = document.getElementById('formacion');
  formacion.textContent = `Education`;

  const licenciatura = document.getElementById('licenciatura');
  licenciatura.textContent = `Multimedia Design Bachelor's Degree`;

  const cursoFullStack = document.getElementById('cursoFullStack');
  cursoFullStack.textContent = `Full-Stack NodeJS Course`;

  const idiomas = document.querySelector(".formacion__idiomas");
  idiomas.innerHTML = `
        <h2>Languages</h2>
          <div class="formacion__idiomas__individuales">
          <p><b>Spanish:</b> Native</p>
          <p><b>English:</b> Intermediate Written, Basic Oral</p>
        </div>
    `;

  const experiencia = document.querySelector('.experiencia');
  experiencia.innerHTML = `
    <h2>Experience</h2>
                        <div class="experiencia__individual">
                            <h3>Teaching Assistant and Unity Programming Tutor</h3>
                            <p>Facultad de Artes - UNLP</p>
                            <p>sept. 2023 - Current</p>
                            <p>Taller de Diseño de Experiencias Interactivas (ex Taller de Diseño Multimedial 1)</p>
                            <ul>
                                <li>I cleared and solved doubts of the students from programming in Unity with C#.
                                </li>
                                <li>I was part of the management of the Discord platform as the main communication for contact with students.</li>
                            </ul>
                        </div>
                        <div class="experiencia__individual">
                            <h3>Web Design and Front-end Development (Projects)</h3>
                            <p>Freelance</p>
                            <p>april 2024 - Current</p>
                            <p>B&B Racing Parts (April 2024 - May 2024)</p>
                            <ul>
                                <li>I have done the interface design of a OnePage WebApp, including Login and Filter System. The design was made with Figma. (April 2024) </li>
                                <li>I developed an iframe with HTML for the interactive description of Ebay products. (May 2024)</li>
                            </ul>
                            <p>Bonté Deco (Sept. 2024 - Current)</p>
                            <ul>
                                <li>I designed the whole website with Figma.</li>
                                <li>I developed the website with Astro, TailwindCSS and TypeScript/JS.</li>
                                <li>I implemented SEO using corresponding tags and OpenGraph.</li>
                                <li>I design and generate dynamic pages using Restful API.</li>
                            </ul>
                        </div>
                        `
  const tools = document.getElementById('tools');
  tools.textContent = `Tools`;

  const conocimientosTecnicos = document.getElementById('conocimientos-tecnicos');
  conocimientosTecnicos.textContent = `Technical Knowledge`;

  const diseñoUxui = document.getElementById('diseño-uxui');
  diseñoUxui.innerHTML = `<img src="./img/ux-ui.svg" alt="" class="herramientas__habilidades__lista__img"
                                        loading="lazy" id="diseño-uxui">UX/UI Design`;

  const officePackage = document.getElementById('office-package');
  officePackage.innerHTML = `<img src="./img/office.svg" alt="" class="herramientas__lista__img"
                                        loading="lazy">Microsoft Office Package`;

  const tipografia = document.querySelectorAll('.project__typography');
  tipografia.forEach(tipografias => {
    const h4 = tipografias.querySelector('h4');
    if (h4) {
      h4.textContent = 'Font';
    }
  });

  const colors = document.querySelectorAll('.project__color');
  colors.forEach(color => {
    const h4 = color.querySelector('h4');
    if (h4) {
      h4.textContent = 'Colors';
    }
  });

  const galleryh4 = document.querySelectorAll('.project__gallery');
  galleryh4.forEach(galleriesh4 => {
    const h4 = galleriesh4.querySelector('h4');
    if (h4) {
      h4.textContent = 'Gallery';
    }
  });

  const tipografias = document.getElementById('tipografias');
  tipografias.textContent = `Fonts`;

  const bonteh3 = document.getElementById('bonteh3');
  bonteh3.textContent = `Design and web building - Responsive and Mobile First`;

  const bonteDescription = document.getElementById('bonte-description');
  bonteDescription.innerHTML = `A landing page for Bonté, an interior decoration company. It shows their main products, their catalog with a variety of products, a FAQ section and a functional contact with Netlify Forms.<br>This page was made with Astro, TailwindCSS, JavaScript/TypeScript, and Preline UI and TAOS (Tailwind Animate on Scroll) libraries. It also has SEO implementation, as well as dynamic page design with API Restful.`;

  const webapph3 = document.getElementById('webapph3');
  webapph3.textContent = `Web Design Desktop`;

  const webappDescription = document.getElementById('webapp-description');
  webappDescription.textContent = `Interface design made for the company B&B Racing Parts, with the need to generate a functional platform with good usability.
It includes Login design, One Page main platform and the filter system.`;

  const boxedcath3 = document.getElementById('boxedcath3');
  boxedcath3.textContent = `Web Build - Desktop Responsive`;

  const boxedcatDescription = document.getElementById('boxedcat-description');
  boxedcatDescription.textContent = `A simulation of a note, in this case of an interview, where there are interactive elements such as the ability to save a note, to rate the note and to comment on it. This design includes a registration and login functional with localStorage. It is made with HTML5, CSS3 and JavaScript purely.`;

  const freneticComicsh3 = document.getElementById('frenetic-comicsh3');
  freneticComicsh3.textContent = `Landing Page Design and Web building - Responsive and Mobile First`;

  const freneticComicsDescription = document.getElementById('frenetic-comics-description');
  freneticComicsDescription.textContent = `A landing page made in 2020, readapted in 2024 for readability and usability. Based on a design made by me, Mobile First and Responsive for any device. HTML5, CSS3 and pure JavaScript were used.`;

  const bbracingIframeh3 = document.getElementById('bbracing-iframeh3');
  bbracingIframeh3.textContent = `iframe Build for Ebay Product Description`;

  const bbracingIframeDescription = document.getElementById('bbracing-iframe-description');
  bbracingIframeDescription.innerHTML = `An iframe that can be used as Ebay description, made for the company BBRacing Parts. Mobile First and Responsive. The demo only shows how it would adapt and work to different devices, to see real cases, look for products that have this type of description in <a href="https://www.ebay.com/str/bbsupplyllc" target="_blank">B&B Supply LLC Ebay.</a>`;

  const contactoTelefono = document.getElementById('contacto-telefono');
  contactoTelefono.textContent = `Phone`;

  const contactoCv = document.getElementById('contacto-cv');
  contactoCv.textContent = `My CV`;


  const contactoCvLink = document.getElementById('contacto-cv-link');
  contactoCvLink.setAttribute('href', 'https://drive.google.com/file/d/1JEBJJaP-iBpOOlxJwlGmlGuh_3bYTmwh/view?usp=sharing');
  contactoCvLink.innerHTML = `Open CV
                                <svg viewBox="0 0 428 428" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M73 1.02187C38.7 6.02187 11.4 30.6219 2.3 64.9219L0 73.4219V213.922V354.422L2.3 362.922C10.6 394.222 33.2 416.822 64.5 425.122L73 427.422H213.5H354L362.5 425.122C393.6 416.922 416 394.622 424.7 363.422C426.9 355.622 426.9 353.822 427.3 294.422C427.6 228.422 427.6 227.922 422.3 221.522C414.1 211.522 398.3 211.122 389.3 220.622C383.9 226.322 384 224.922 383.5 290.422C383 350.722 383 351.522 380.8 356.922C375.9 368.922 365.7 378.322 353.5 382.022C347.1 383.922 344 383.922 211.5 383.722L76 383.422L70.5 381.222C58.5 376.322 49.2 366.222 45.5 354.122C43.5 347.822 43.5 344.422 43.5 213.922C43.5 83.4219 43.5 80.0219 45.5 73.7219C49.2 61.6219 58.5 51.5219 70.5 46.6219C75.9 44.4219 76.7 44.4219 137 43.9219C179.9 43.5219 198.8 43.1219 200.6 42.2219C202 41.6219 204.6 39.9219 206.4 38.4219C215.9 30.4219 216.1 14.5219 206.8 5.72187C200.7 -0.0781314 200.6 -0.0781314 137.1 0.0218686C105.2 0.121869 76.3 0.521869 73 1.02187Z" />
                                    <path
                                        d="M271.3 0.921938C266.1 2.52194 261.5 6.12194 258.7 10.7219C256.5 14.5219 256 16.6219 256 21.9219C256 30.4219 259.4 36.6219 266.3 40.6219L271 43.4219L311.4 43.7219L351.9 44.0219L273.8 122.222C230.8 165.222 194.9 202.022 193.9 203.922C191.5 208.422 191.4 219.222 193.7 223.422C195.8 227.322 200.1 231.622 204 233.722C208.2 236.022 219 235.922 223.5 233.522C225.4 232.522 262.2 196.622 305.2 153.622L383.4 75.5219L383.7 116.022L384 156.422L386.8 161.122C390.8 168.022 397 171.422 405.5 171.422C412.6 171.322 416.3 169.922 420.9 165.322C427.4 158.822 427 163.522 427 85.9219V15.4219L424.2 10.7219C422.4 7.62194 419.8 5.02194 416.7 3.22194L412 0.421938L343 0.221938C305.1 0.121938 272.8 0.421938 271.3 0.921938Z" />
                                </svg>`;
}