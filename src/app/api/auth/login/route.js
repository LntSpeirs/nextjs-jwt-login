import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  const { email, password } = await req.json();

  //Comprobar que el email es valido
  //Comprobar si el email existe en la base de datos
  //Comprobar que la contraseña es correcta

  if (email === "correo@correo.es" && password === "admin") {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //Token valido durante 30 dias
        email: "correo@correo.es",
        username: "admin",
      },
      process.env.API_SECRET
    );
    console.log(token);
    const tokenSerializado = serialize("myTokenName", token, {
      httpOnly: true, //Solo puede ser accedida por http
      secure: process.env.NODE_ENV === "production", //si estas en produccion usa SSL
      sameSite: "strict", //la coockie esta siendo entregada desde el mismo dominio
      maxAge: 1000 * 60 * 60 * 24 * 30, //Expiracion en 30 dias
      path: "/", //ruta desde donde es entregado
    });

    return new Response("Autorizado", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Set-Cookie": tokenSerializado,
      },
    });
  } else {
    return new Response("No autorizado", {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
