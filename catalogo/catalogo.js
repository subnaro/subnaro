let galeriaActual = [];
let indiceActual = 0;

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productosCatalogo);
});

function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  lista.forEach((producto, index) => {
    const mensaje = `Hola, quiero consultar por: ${producto.nombre} - $${producto.precio}`;
    const url = `https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent(mensaje)}`;

    contenedor.innerHTML += `
      <div class="card">
        <img 
          src="${producto.imagen}" 
          alt="${producto.nombre}" 
          class="img-producto"
          onclick="abrirModalPorProducto(${obtenerIndiceOriginal(producto)})"
        >
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

function obtenerIndiceOriginal(productoBuscado) {
  return productosCatalogo.findIndex(
    producto => producto.nombre === productoBuscado.nombre
  );
}

/* FILTROS */
function filtrar(categoria) {
  if (categoria === "todos") {
    mostrarProductos(productosCatalogo);
  } else {
    const filtrados = productosCatalogo.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
  }
}

/* MODAL */
function abrirModalPorProducto(indiceProducto) {
  const producto = productosCatalogo[indiceProducto];
  galeriaActual = producto.galeria && producto.galeria.length > 0
    ? producto.galeria
    : [producto.imagen];

  indiceActual = 0;

  const modal = document.getElementById("modal-galeria");
  modal.classList.remove("oculto");

  renderizarImagenModal();
  renderizarMiniaturas();
}

function cerrarModal() {
  document.getElementById("modal-galeria").classList.add("oculto");
}

function renderizarImagenModal() {
  const imagenPrincipal = document.getElementById("modal-imagen-principal");
  imagenPrincipal.src = galeriaActual[indiceActual];
}

function renderizarMiniaturas() {
  const contenedorMiniaturas = document.getElementById("modal-miniaturas");
  contenedorMiniaturas.innerHTML = "";

  galeriaActual.forEach((img, index) => {
    contenedorMiniaturas.innerHTML += `
      <img 
        src="${img}" 
        class="miniatura ${index === indiceActual ? "activa" : ""}" 
        onclick="irAImagen(${index})"
      >
    `;
  });
}

function imagenSiguiente() {
  indiceActual++;
  if (indiceActual >= galeriaActual.length) {
    indiceActual = 0;
  }
  renderizarImagenModal();
  renderizarMiniaturas();
}

function imagenAnterior() {
  indiceActual--;
  if (indiceActual < 0) {
    indiceActual = galeriaActual.length - 1;
  }
  renderizarImagenModal();
  renderizarMiniaturas();
}

function irAImagen(indice) {
  indiceActual = indice;
  renderizarImagenModal();
  renderizarMiniaturas();
}

/* CERRAR CON ESC */
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("modal-galeria");

  if (!modal.classList.contains("oculto")) {
    if (e.key === "Escape") cerrarModal();
    if (e.key === "ArrowRight") imagenSiguiente();
    if (e.key === "ArrowLeft") imagenAnterior();
  }
});