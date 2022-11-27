
import { Routes, Route} from "react-router-dom";
import Dashboard from "./Dashboard-Admin/Dashboard-Admin";
import Users from "./Users-Admin/Users-Admin"
import Companies from "./Companies-Admin/Companies-Admin"
import Jobs from "./Jobs-Admin/Jobs-Admin"
function AdminPanel() {




  
    return <div

    className="App">

 <Routes>
       <Route path = "/" element={<Dashboard/> }  />
       <Route path = "/users" element={<Users/> }  />
       <Route path = "/companies" element={<Companies/> }  />
       <Route path = "/jobs" element={<Jobs/> }  />
 </Routes>
 
    </div>;
  
}

export default AdminPanel;
