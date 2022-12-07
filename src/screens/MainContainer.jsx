import { useContext } from "react";
import { UserContext } from "../hooks/UserContext";
import { EncargadoNavigation } from "../Navigation/EncargadoNavigation";
import { GerenteNavigation } from "../Navigation/GerenteNavigation";
import { MeseroNavi } from "../Navigation/MeseroNavi";
import { BarmanNavigation } from "../Navigation/BarmanNavigation";

export const MainContainer = ({ navigation }) => {
  const { usuario } = useContext(UserContext);

  return (
    <>
      {usuario.rol == "Gerente" ? (
        <GerenteNavigation />
      ) : usuario.rol == "Mesero" ? (
        <MeseroNavi />
      ) : usuario.rol == "Encargado" ? (
        <EncargadoNavigation />
      ) : (
        <BarmanNavigation />
      )}
    </>
  );
};
