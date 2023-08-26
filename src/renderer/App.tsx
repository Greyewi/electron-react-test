import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import History from './Pages/History';
import ToDo from './Pages/ToDo';
import { TodoProvider } from './context';
import './style.css';
import { useIPC } from './Hooks/useIPC';

export default function App() {
  const result = useIPC<{ a: number; b: number }, number>(
    'add-numbers',
    'add-numbers-response',
    { a: 3, b: 6 }
  );

  return (
    <TodoProvider>
      <Router>
        <nav>
          <Link to="/">ToDo</Link>
          <Link to="/history">History</Link>
          <b>The data from node: {result}</b>
        </nav>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}
