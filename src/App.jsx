import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ProjectManagement from "./components/ProjectManagement";
import CreateProject from "./components/CreateProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/projects" element={<ProjectManagement />} />
          <Route path="/projects/create" element={<CreateProject />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
