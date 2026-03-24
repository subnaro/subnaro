function generarGaleria(base, cantidad, carpeta = "./img.catalogo/", extension = "png") {
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
    categoria: "signos",
    imagen: "catalogo/img.catalogo/signos1.png",
    galeria: generarGaleria("signos", 4)
  },
  {
    nombre: "Anime",
    precio: 7000,
    categoria: "anime",
    imagen: "catalogo/img.catalogo/anime1.png",
    galeria: generarGaleria("anime", 4)
  },
  {
    nombre: "Planetas",
    precio: 7000,
    categoria: "personalizado",
    imagen: "catalogo/img.catalogo/planetas1.png",
    galeria: generarGaleria("planetas", 4)
  }
];