// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Login from "./components/Login";
import AdminDashboard from "./pages/adminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bienvenida" element={<AdminDashboard />} />
        </Routes>
      </Router>
      {/* <Login /> */}
      {/* <AdminDashboard /> */}
    </>
  );
}

export default App;
