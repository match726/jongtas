import { Routes, Route } from 'react-router-dom';

import { Home } from '@/features/misc/routes/Home';
import { Login } from '@/features/account/routes/Login';
import { Logout } from '@/features/account/routes/Logout';
import { Signup } from '@/features/account/routes/Signup';
import { NotFound } from '@/features/misc/routes/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/logout" element={ <Logout /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
};

export default App;