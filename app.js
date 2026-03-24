document.addEventListener("DOMContentLoaded", () => {
  configurarMenuHamburguesa();
  cargarSeccion("inicio");
});

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
    const clicFueraDelMenu = !mainNav.contains(e.target) && !menuToggle.contains(e.target);
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
  scripts.forEach(script => script.remove());
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

function cargarSeccion(seccion) {
  const contenedor = document.getElementById("contenido");

  cerrarMenuHamburguesa();

  window.scrollTo(0, 0);

  if (seccion === "inicio") {
    contenedor.innerHTML = `
      <section class="hero">
        <div class="overlay"></div>
        <div class="hero-content">
          <h1>Diseños que se convierten en regalos</h1>
          <p>Tazas personalizadas con tu estilo</p>
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
    return;
  }

  if (seccion === "catalogo") {
    fetch("catalogo/catalogo.html")
      .then(res => res.text())
      .then(html => {
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
      .then(res => res.text())
      .then(html => {
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

function cargarProductos() {
  const contenedor = document.getElementById("contenedor-productos");

  if (!contenedor) return;

  contenedor.innerHTML = "";

  productos.forEach(producto => {
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