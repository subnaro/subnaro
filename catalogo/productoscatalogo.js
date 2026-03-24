function generarGaleria(base, cantidad, carpeta = "catalogo/img.catalogo/", extension = "png") {
  const imagenes = [];

  for (let i = 1; i <= cantidad; i++) {
    imagenes.push(`${carpeta}${base}${i}.${extension}`);
  }

  return imagenes;
}

const productosCatalogo = [
  {
    nombre: "Signos",
    precio: 7000,
    imagen: "catalogo/img.catalogo/signos1.png",
    galeria: generarGaleria("signos", 1)
  },
  {
    nombre: "Planetas",
    precio: 7000,
    imagen: "catalogo/img.catalogo/planetas1.png",
    galeria: generarGaleria("planetas", 1)
  },
  {
    nombre: "Orco",
    precio: 5300,
    imagen: "catalogo/img.catalogo/orco1.png",
    galeria: generarGaleria("planetas", 1)
  }
];