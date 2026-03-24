document.addEventListener("DOMContentLoaded", () => {
  cargarSeccion("inicio");
});

function cargarSeccion(seccion) {
  const contenedor = document.getElementById("contenido");

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
  }

  if (seccion === "catalogo") {
    fetch("catalogo/catalogo.html")
      .then(res => res.text())
      .then(html => {
        contenedor.innerHTML = html;

        // 🔥 INICIAR CATÁLOGO (CLAVE)
        if (typeof iniciarCatalogo === "function") {
          iniciarCatalogo();
        }
      });
  }

  if (seccion === "simulador") {
    fetch("simulador/simulador.html")
      .then(res => res.text())
      .then(html => {
        contenedor.innerHTML = html;
      });
  }

  if (seccion === "destacados") {
    cargarSeccion("inicio");
    setTimeout(() => {
      document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  if (seccion === "contacto") {
    cargarSeccion("inicio");
    setTimeout(() => {
      document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
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
        <img src="${producto.imagen}" class="img-producto">
        <div class="card-content">
          <h3>${producto.nombre}</h3>
          <p class="precio">$${producto.precio}</p>
          <a href="${url}" target="_blank">
            <button>Consultar</button>
          </a>
        </div>
      </div>
    `;
  });
}