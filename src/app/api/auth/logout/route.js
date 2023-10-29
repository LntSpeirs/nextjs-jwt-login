import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  const token = req.cookies.get("myTokenName");
  if (!token) {
    return NextResponse.error("Token JWT no proporcionado", { status: 401 });
  }

  try {
    const user = verify(token.value, process.env.API_SECRET);

    const tokenSerializado = serialize("myTokenName", null, {
      httpOnly: true, //Solo puede ser accedida por http
      secure: process.env.NODE_ENV === "production", //si estas en produccion usa SSL
      sameSite: "strict", //la coockie esta siendo entregada desde el mismo dominio
      maxAge: 0,
      path: "/", //ruta desde donde es entregado
    });

    return new Response("Cierre de sesion correcto", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Set-Cookie": tokenSerializado,
      },
    });
  } catch (error) {
    return NextResponse.error("Token JWT inválido", { status: 401 });
  }
}
