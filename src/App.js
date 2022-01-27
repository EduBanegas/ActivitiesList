import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// Estilos
import "./App.css";

// Acciones
import { authenticateUser, getAllActivities, getDataUser } from "./Store/Action/action";
// Componentes
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Statistics from "./components/Statistics/Statistics";
import DetailStatistics from "./components/DetailStatistics/DetailStatistics";

function App() {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.userInfo.accessToken.access_token);

  useEffect(() => {
    // Obtiene el token
    dispatch(authenticateUser());
    if (accessToken !== undefined) {
      // Obtenemos los datos del usuario
      dispatch(getDataUser(accessToken));
      // Obtenemos todas las actividades del usuario
      dispatch(getAllActivities(accessToken));
    }
  }, [accessToken]);

  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route exact path="/statistics/:id" element={<DetailStatistics />} />
      </Routes>
    </div>
  );
}

export default App;
