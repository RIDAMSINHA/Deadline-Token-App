import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/utilites/ErrorPage';
import Signup from './components/Student_signup';
import Login from './components/Student_login';
import AssignmentUpload from './components/Assignment_Upload';
import StudentPortal from './components/student_portal';
import Wallet from './components/Wallet';
import SubmitAssignment from './components/Submit_assignment';

function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
            <Route path="/student_signup" element={<Signup />} errorElement={<ErrorPage />} />
            <Route path="/assignment_upload" element={<AssignmentUpload />} errorElement={<ErrorPage />} />
            <Route path="/student_portal" element={<StudentPortal />} errorElement={<ErrorPage />} />
            <Route path="/submit_assignment" element={<SubmitAssignment />} errorElement={<ErrorPage />} />
            <Route path="/wallet" element={<Wallet />} errorElement={<ErrorPage />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
