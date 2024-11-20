import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ProjectList from "./pages/project/ProjectList";
import ProjectForm from "./pages/project/ProjectForm";
import ContractForm from "./pages/contract/ContractForm";
import ContractList from "./pages/Contract/ContractList";
import PaymentList from "./pages/payment/PaymentList";
import PaymentForm from "./pages/payment/PaymentForm";
import AccountList from "./pages/account/AccountList";
import AccountForm from "./pages/account/AccountForm";
import Report from "./pages/report";
import InvestorList from "./pages/investor/InvestorList";
import InvestorForm from "./pages/investor/InvestorForm";
import NotFound from "./pages/not_found";
import Overview from "./pages/Contract/OverView";
import ManageJob from "./pages/Contract/ManageJob";

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
          {/*investors route*/}
          <Route path="/investors" element={<InvestorList />} />
          <Route path="/investors/create" element={<InvestorForm />} />
          <Route path="/investors/edit/:id" element={<InvestorForm />} />
          {/*report route*/}
          <Route path="/reports" element={<Report />} />
          <Route path="/contracts/manage-jobs" element={<ManageJob />} />
          {/* Route 404 */}
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
