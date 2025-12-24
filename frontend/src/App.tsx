import { Routes, Route } from 'react-router-dom';

import { Home } from '@/features/misc/routes/Home';
import { Login } from '@/features/login/routes/Login';
import { NotFound } from '@/features/misc/routes/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
};

export default App;