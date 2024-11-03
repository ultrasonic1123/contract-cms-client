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
import PaymentList from "./pages/Payment/PaymentList";
import PaymentForm from "./pages/Payment/PaymentForm";
import AccountList from "./pages/Account/AccountList";
import AccountForm from "./pages/Account/AccountForm";
import Report from "./pages/Report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/projects" replace />} />
          {/*projects route */}
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/create" element={<ProjectForm />} />
          <Route path="/projects/edit/:id" element={<ProjectForm />} />
          {/*contracts route */}
          <Route path="/contracts" element={<ContractList />} />
          <Route path="/contracts/create" element={<ContractForm />} />
          <Route path="/contracts/edit/:id" element={<ContractForm />} />
          {/*payments route*/}
          <Route path="/payments" element={<PaymentList />} />
          <Route path="/payments/create" element={<PaymentForm />} />
          <Route path="/payments/edit/:id" element={<PaymentForm />} />
          {/*accounts route*/}
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/accounts/create" element={<AccountForm />} />
          <Route path="/accounts/edit/:id" element={<AccountForm />} />
          {/*report route*/}
          <Route path="/reports" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
