import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ProjectList from "./pages/Project/ProjectList";
import ProjectForm from "./pages/Project/ProjectForm";
import ContractForm from "./pages/Contract/ContractForm";
import ContractList from "./pages/Contract/ContractList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/projects" replace />} />
          {/*project route */}
          <Route index path="/projects" element={<ProjectList />} />
          <Route path="/projects/create" element={<ProjectForm />} />
          <Route path="/projects/edit/:id" element={<ProjectForm />} />
          {/*contract route */}
          <Route path="/contracts" element={<ContractList />} />
          <Route path="/contracts/create" element={<ContractForm />} />
          <Route path="/contracts/edit/:id" element={<ContractForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
