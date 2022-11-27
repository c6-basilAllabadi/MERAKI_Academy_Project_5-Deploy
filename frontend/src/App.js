import "./App.css";
import { Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import UsersApp from "./components/UsersApp/UsersApp";
import CompaniesApp from "./components/CompaniesApp/CompaniesApp";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Messenger from "./components/messenger/messenger";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/users/*" element={<UsersApp />} />
        <Route path="/companies/*" element={<CompaniesApp />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/messenger" element={<Messenger/>} />
     
        
      </Routes>
     

    </div>
  );
}

export default App;
