// app/lib/cloudinary.ts
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const TAMANIO_MAXIMO_MB = 5;

// Sube una imagen a Cloudinary (upload preset sin firma) y devuelve su URL pública
export async function subirImagen(archivo: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Falta configurar Cloudinary en .env.local");
  }
  if (!archivo.type.startsWith("image/")) {
    throw new Error("El archivo tiene que ser una imagen.");
  }
  if (archivo.size > TAMANIO_MAXIMO_MB * 1024 * 1024) {
    throw new Error(`La imagen no puede pesar más de ${TAMANIO_MAXIMO_MB} MB.`);
  }

  const datos = new FormData();
  datos.append("file", archivo);
  datos.append("upload_preset", UPLOAD_PRESET);

  const respuesta = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: datos },
  );
  if (!respuesta.ok) {
    throw new Error("No se pudo subir la imagen. Intentá de nuevo.");
  }

  const resultado: { secure_url: string } = await respuesta.json();
  return resultado.secure_url;
}

// Pide a Cloudinary la foto recortada en cuadrado, centrada en la cara y optimizada
export function urlMiniatura(url: string, tamanio: number) {
  return url.replace(
    "/upload/",
    `/upload/c_fill,g_face,w_${tamanio * 2},h_${tamanio * 2},f_auto,q_auto/`,
  );
}

// Foto circular (PNG con fondo transparente) para el CV en PDF, ya convertida a data URL
export async function fotoParaPdf(url: string): Promise<string> {
  const urlCircular = url.replace(
    "/upload/",
    "/upload/c_fill,g_face,w_300,h_300,r_max,f_png/",
  );
  const respuesta = await fetch(urlCircular);
  if (!respuesta.ok) throw new Error("No se pudo descargar la foto");
  const blob = await respuesta.blob();

  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result as string);
    lector.onerror = reject;
    lector.readAsDataURL(blob);
  });
}
