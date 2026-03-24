let galeriaActual = [];
let indiceActual = 0;

function iniciarCatalogo() {
  mostrarProductos(productosCatalogo);
}

function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    const indiceOriginal = productosCatalogo.findIndex(
      p => p.nombre === producto.nombre
    );

    const mensaje = `Hola, quiero consultar por: ${producto.nombre} - $${producto.precio}`;
    const url = `https://wa.me/5491160584396?text=${encodeURIComponent(mensaje)}`;

    contenedor.innerHTML += `
      <div class="card">
        <img 
          src="${producto.imagen}" 
          alt="${producto.nombre}" 
          class="img-producto"
          onclick="abrirModalPorProducto(${indiceOriginal})"
        >

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

function abrirModalPorProducto(indiceProducto) {
  const producto = productosCatalogo[indiceProducto];
  if (!producto) return;

  galeriaActual = producto.galeria && producto.galeria.length > 0
    ? producto.galeria
    : [producto.imagen];

  indiceActual = 0;

  const modal = document.getElementById("modal-galeria");
  if (!modal) return;

  modal.classList.remove("oculto");

  renderizarImagenModal();
  renderizarMiniaturas();
}

function cerrarModal() {
  const modal = document.getElementById("modal-galeria");
  const imagenPrincipal = document.getElementById("modal-imagen-principal");
  const miniaturas = document.getElementById("modal-miniaturas");

  if (modal) modal.classList.add("oculto");
  if (imagenPrincipal) imagenPrincipal.removeAttribute("src");
  if (miniaturas) miniaturas.innerHTML = "";
}

function renderizarImagenModal() {
  const imagenPrincipal = document.getElementById("modal-imagen-principal");
  if (!imagenPrincipal || !galeriaActual.length) return;

  imagenPrincipal.src = galeriaActual[indiceActual];
}

function renderizarMiniaturas() {
  const contenedorMiniaturas = document.getElementById("modal-miniaturas");
  if (!contenedorMiniaturas) return;

  contenedorMiniaturas.innerHTML = "";

  galeriaActual.forEach((img, index) => {
    contenedorMiniaturas.innerHTML += `
      <img 
        src="${img}" 
        class="miniatura ${index === indiceActual ? "activa" : ""}" 
        onclick="irAImagen(${index})"
        alt="Miniatura ${index + 1}"
      >
    `;
  });
}

function imagenSiguiente() {
  if (!galeriaActual.length) return;
  indiceActual = (indiceActual + 1) % galeriaActual.length;
  renderizarImagenModal();
  renderizarMiniaturas();
}

function imagenAnterior() {
  if (!galeriaActual.length) return;
  indiceActual = (indiceActual - 1 + galeriaActual.length) % galeriaActual.length;
  renderizarImagenModal();
  renderizarMiniaturas();
}

function irAImagen(indice) {
  if (!galeriaActual.length) return;
  indiceActual = indice;
  renderizarImagenModal();
  renderizarMiniaturas();
}

document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("modal-galeria");
  if (!modal || modal.classList.contains("oculto")) return;

  if (e.key === "Escape") cerrarModal();
  if (e.key === "ArrowRight") imagenSiguiente();
  if (e.key === "ArrowLeft") imagenAnterior();
});