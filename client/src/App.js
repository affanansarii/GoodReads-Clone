import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BooksProvider } from './contexts/BooksContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyBooks from './pages/MyBooks';
import Auth from './pages/Auth';

function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mybooks" element={<MyBooks />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      </BooksProvider>
    </AuthProvider>
  );
}
export default App;
