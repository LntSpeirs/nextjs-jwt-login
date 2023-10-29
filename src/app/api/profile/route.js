import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function GET(req) {
  //console.log("cookies" ,req.cookies)
  //console.log("myTokenName", req.cookies.get("myTokenName"))
  const token = req.cookies.get("myTokenName");
  //console.log(token)
  if (!token) {
    // Si no se proporciona el token, puedes devolver un error o redireccionar al usuario.
    return NextResponse.error("Token JWT no proporcionado", { status: 401 });
  }

  try {
    const user = verify(token.value, process.env.API_SECRET);
    console.log(user);
    return NextResponse.json(
      { username: user.username, email: user.email },
      { status: 200 }
    );
  } catch (error) {
    // Si hay un error al verificar el token, puedes devolver un error.
    return NextResponse.error("Token JWT inválido", { status: 401 });
  }
}
