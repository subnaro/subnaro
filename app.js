document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("contenedor-productos");

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

  // ===== MODAL =====
  const modal = document.getElementById("modal-img");
  const imgGrande = document.getElementById("img-grande");
  const cerrar = document.querySelector(".cerrar");

  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("img-producto")) {
      modal.style.display = "block";
      imgGrande.src = e.target.src;
    }
  });

  cerrar.onclick = () => modal.style.display = "none";

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

});