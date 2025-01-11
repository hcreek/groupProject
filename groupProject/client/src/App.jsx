import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { SavedMessages } from './components/SavedMessages';
import { EditPage } from './components/EditPage';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this is correctly implemented
import './App.css';

function App() {
  console.log('App component loaded');

  return (

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          {/*<Route path="/articles/save" element={<Save />} />*/}
          <Route path="/profile" element={<SavedProfiles />} />
          <Route path="/edit-profile/:userId" element={<EditProfilePage />} /> 
          <Route path="/delete-profile/:userId" element={<EditProfilePage />} />
          <Route path="edit-message/:userId" element={<EditMessagePage/>} />
          <Route path="delete-message/:userId" element={<DeleteMessagePage />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  
  );
}

export default App;