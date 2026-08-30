/**
 * Sube una imagen local a Cloudinary desde la terminal (uso admin).
 * Las credenciales NUNCA deben ir en variables VITE_* (esas se
 * incluyen en el bundle del navegador). Este script solo corre en
 * Node, así que puede usar la API key/secret completas con seguridad.
 *
 * Uso:
 *   node --env-file=.env scripts/cloudinary-upload.mjs <ruta-local> [carpeta] [public_id]
 *
 * Ejemplo:
 *   node --env-file=.env scripts/cloudinary-upload.mjs ./foto-perfil.jpg wasakabe/about perfil
 *
 * Requiere en .env (SIN prefijo VITE_):
 *   CLOUDINARY_CLOUD_NAME=...
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 */
import { v2 as cloudinary } from "cloudinary";

const [, , filePath, folder = "wasakabe", publicId] = process.argv;

if (!filePath) {
  console.error(
    "Uso: node --env-file=.env scripts/cloudinary-upload.mjs <ruta-local> [carpeta] [public_id]",
  );
  process.exit(1);
}

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(
    "Faltan CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET en el entorno.\n" +
      "Agrégalas a .env (sin prefijo VITE_) y corre el script con --env-file=.env",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

try {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });

  console.log("\n✅ Subida exitosa\n");
  console.log("secure_url:", result.secure_url);
  console.log("public_id: ", result.public_id);
  console.log(
    "\nPega estos dos valores en la fila correspondiente de Supabase (columnas *_url y *_public_id).",
  );
} catch (err) {
  console.error("\n❌ Error al subir a Cloudinary:", err.message || err);
  process.exit(1);
}
