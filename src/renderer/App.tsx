import { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import History from './pages/History';
import ToDo from './pages/ToDo';
import { TodoProvider } from './context';
import './style.css';

const { electron } = window;

export default function App() {
  useEffect(() => {
    electron.ipcRenderer.sendMessage('add-numbers', { a: 3, b: 6 });

    electron.ipcRenderer.on('add-numbers-response', (response) => {
      // eslint-disable-next-line no-console
      console.log(response);
    });
  }, []);

  return (
    <TodoProvider>
      <Router>
        <nav>
          <Link to="/">ToDo</Link>
          <Link to="/history">History</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}
