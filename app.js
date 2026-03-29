document.addEventListener("DOMContentLoaded", () => {
  configurarMenuHamburguesa();
  cargarSeccion("inicio");
});

let heroIntervalo = null;
let heroResizeHandler = null;
let heroTransitionHandler = null;
let heroTrackActual = null;

function configurarMenuHamburguesa() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", () => {
    const abierto = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("active", abierto);
    menuToggle.setAttribute("aria-expanded", abierto ? "true" : "false");
  });

  mainNav.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      cerrarMenuHamburguesa();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      cerrarMenuHamburguesa();
    }
  });

  document.addEventListener("click", (e) => {
    const clicFueraDelMenu =
      !mainNav.contains(e.target) && !menuToggle.contains(e.target);

    if (clicFueraDelMenu) {
      cerrarMenuHamburguesa();
    }
  });
}

function cerrarMenuHamburguesa() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (!menuToggle || !mainNav) return;

  mainNav.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}

function eliminarScriptSiExiste(src) {
  const scripts = document.querySelectorAll(`script[src="${src}"]`);
  scripts.forEach((script) => script.remove());
}

function cargarScript(src, callback) {
  eliminarScriptSiExiste(src);

  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    if (typeof callback === "function") callback();
  };

  document.body.appendChild(script);
}

function detenerCarruselHero() {
  if (heroIntervalo) {
    clearInterval(heroIntervalo);
    heroIntervalo = null;
  }

  if (heroResizeHandler) {
    window.removeEventListener("resize", heroResizeHandler);
    heroResizeHandler = null;
  }

  if (heroTrackActual && heroTransitionHandler) {
    heroTrackActual.removeEventListener("transitionend", heroTransitionHandler);
  }

  heroTrackActual = null;
  heroTransitionHandler = null;
}

function cargarSeccion(seccion) {
  const contenedor = document.getElementById("contenido");
  if (!contenedor) return;

  cerrarMenuHamburguesa();
  detenerCarruselHero();
  window.scrollTo(0, 0);

  if (seccion === "inicio") {
    contenedor.innerHTML = `
      <section class="hero hero-slider" id="hero">
        <div class="hero-slider-viewport" id="heroSliderViewport">
          <div class="hero-slider-track" id="heroSliderTrack"></div>
        </div>

        <div class="overlay"></div>

        <div class="hero-content">
          <h1>Regalos únicos que hablan por vos</h1>
          <p>Personalizá tazas, remeras y más con tu estilo</p>
          <a href="https://wa.me/5491160584396" target="_blank" class="btn-wsp btn-llamativo">
            Pedir por WhatsApp
          </a>
        </div>
      </section>

      <section id="productos" class="productos fondo2">
        <div class="productos-content">
          <h2>Productos Destacados</h2>
          <div id="contenedor-productos" class="grid"></div>
        </div>
      </section>

      <section id="contacto" class="contacto">
        <h2>Contacto</h2>
        <p>Hacé tu pedido personalizado por WhatsApp</p>
        <a href="https://wa.me/5491160584396" class="btn-wsp">Escribinos</a>
      </section>

      <footer class="footer-subnaro">
        <div class="footer-container">
          <div class="footer-col footer-izq">
            <h3>Medios de pago</h3>
            <p>Podés abonar por transferencia y tarjetas</p>
            <div class="footer-pagos">
              <span class="pago-item">🏦 Transferencia</span>
              <span class="pago-item">💳 Tarjetas</span>
            </div>
            <p class="footer-web">www.subnaro.com.ar</p>
            <p class="footer-copy">Todos los derechos reservados</p>
          </div>

          <div class="footer-col footer-der">
            <h3>Regalá con tu estilo</h3>
            <p>Animate a regalar algo con tu estilo personalizado</p>
            <div class="footer-envio">
              <span class="envio-icono">🇦🇷</span>
              <span>Envíos a todo el país</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          © Subnaro - Todos los derechos reservados
        </div>
      </footer>
    `;

    cargarProductos();
    iniciarCarruselHero();
    return;
  }

  if (seccion === "catalogo") {
    fetch("catalogo/catalogo.html")
      .then((res) => res.text())
      .then((html) => {
        contenedor.innerHTML = html;

        cargarScript("catalogo/productoscatalogo.js", () => {
          cargarScript("catalogo/catalogo.js", () => {
            if (typeof iniciarCatalogo === "function") {
              iniciarCatalogo();
            }
          });
        });
      });

    return;
  }

  if (seccion === "simulador") {
    fetch("simulador/simulador.html")
      .then((res) => res.text())
      .then((html) => {
        contenedor.innerHTML = html;

        cargarScript("simulador/simulador.js", () => {
          if (typeof iniciarSimulador === "function") {
            iniciarSimulador();
          }
        });
      });

    return;
  }

  if (seccion === "destacados") {
    cargarSeccion("inicio");
    setTimeout(() => {
      const productos = document.getElementById("productos");
      if (productos) {
        productos.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
    return;
  }

  if (seccion === "contacto") {
    cargarSeccion("inicio");
    setTimeout(() => {
      const contacto = document.getElementById("contacto");
      if (contacto) {
        contacto.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  }
}

function iniciarCarruselHero() {
  const viewport = document.getElementById("heroSliderViewport");
  const track = document.getElementById("heroSliderTrack");

  if (!viewport || !track) return;

  const imagenes = [];
  let indiceActual = 1;
  let totalReales = 0;

  function verificarImagen(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  function crearSlide(src, realIndex, esClon = false) {
    const slide = document.createElement("div");
    slide.className = "hero-slide";
    slide.dataset.realIndex = String(realIndex);

    if (esClon) {
      slide.dataset.clone = "true";
    }

    const imagen = document.createElement("img");
    imagen.className = "hero-slide-imagen";
    imagen.src = src;
    imagen.alt = `Imagen hero ${realIndex}`;
    imagen.draggable = false;

    slide.appendChild(imagen);
    return slide;
  }

  function obtenerIndiceRealVisible() {
    if (indiceActual === 0) return totalReales;
    if (indiceActual === totalReales + 1) return 1;
    return indiceActual;
  }

  function marcarSlideActiva() {
    const indiceReal = obtenerIndiceRealVisible();
    const slides = track.querySelectorAll(".hero-slide");

    slides.forEach((slide) => {
      const esActiva =
        slide.dataset.clone !== "true" &&
        Number(slide.dataset.realIndex) === indiceReal;

      slide.classList.toggle("is-active", esActiva);
    });
  }

  function actualizarPosicion(animar = true) {
    const slides = track.querySelectorAll(".hero-slide");
    const slideObjetivo = slides[indiceActual];

    if (!slideObjetivo) return;

    track.classList.toggle("sin-transicion", !animar);

    const centroViewport = viewport.clientWidth / 2;
    const centroSlide = slideObjetivo.offsetLeft + slideObjetivo.offsetWidth / 2;
    const desplazamiento = centroSlide - centroViewport;

    track.style.transform = `translateX(-${desplazamiento}px)`;
    marcarSlideActiva();
  }

  async function cargarImagenesHero() {
    const existeBase = await verificarImagen("img/hero.png");
    if (existeBase) {
      imagenes.push("img/hero.png");
    }

    let i = 1;
    while (true) {
      const ruta = `img/hero${i}.png`;
      const existe = await verificarImagen(ruta);

      if (!existe) break;

      imagenes.push(ruta);
      i++;
    }

    if (imagenes.length === 0) return;

    totalReales = imagenes.length;
    track.innerHTML = "";

    if (totalReales === 1) {
      track.appendChild(crearSlide(imagenes[0], 1, false));
      indiceActual = 0;
      requestAnimationFrame(() => {
        actualizarPosicion(false);
      });
      return;
    }

    track.appendChild(crearSlide(imagenes[totalReales - 1], totalReales, true));

    imagenes.forEach((src, index) => {
      track.appendChild(crearSlide(src, index + 1, false));
    });

    track.appendChild(crearSlide(imagenes[0], 1, true));

    indiceActual = 1;

    requestAnimationFrame(() => {
      actualizarPosicion(false);
    });

    heroTransitionHandler = (e) => {
      if (e.propertyName !== "transform") return;

      if (indiceActual === 0) {
        indiceActual = totalReales;
        actualizarPosicion(false);
      }

      if (indiceActual === totalReales + 1) {
        indiceActual = 1;
        actualizarPosicion(false);
      }
    };

    track.addEventListener("transitionend", heroTransitionHandler);
    heroTrackActual = track;

    heroResizeHandler = () => {
      actualizarPosicion(false);
    };

    window.addEventListener("resize", heroResizeHandler);

    heroIntervalo = setInterval(() => {
      indiceActual += 1;
      actualizarPosicion(true);
    }, 4500);
  }

  cargarImagenesHero();
}

function cargarProductos() {
  const contenedor = document.getElementById("contenedor-productos");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const mensaje = `Hola, quiero consultar por: ${producto.nombre} - $${producto.precio}`;
    const url = `https://wa.me/5491160584396?text=${encodeURIComponent(mensaje)}`;

    contenedor.innerHTML += `
      <div class="card">
        <img src="${producto.imagen}" class="img-producto" alt="${producto.nombre}">
        <div class="card-content">
          <h3>${producto.nombre}</h3>
          <p class="precio">$${producto.precio}</p>
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            <button>Consultar</button>
          </a>
        </div>
      </div>
    `;
  });
}