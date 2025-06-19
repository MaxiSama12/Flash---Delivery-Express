import { useLogin } from "../../context/useLogin";
//import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const { rol } = useLogin();
  if (rol === "cliente") return <> {children} </>;
  else if(rol === "comercio") return <> {children} </>
  else if(rol === "repartidor") return <> {children} </>
}
