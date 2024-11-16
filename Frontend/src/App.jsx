import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./component/Header";
import { Home } from "./pages/Home";
import { Rated } from "./pages/Rated";
import { UpcommingMovies } from "./pages/UpcommingMovies";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="mt-[-20px]">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/toprating" element={<Rated />} />
            <Route path="/upcomming" element={<UpcommingMovies />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
