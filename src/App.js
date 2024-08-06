import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes, ProtectedRoutes } from './AppRoutes';

function App() {
  return (
    <Router>
      <AppRoutes />
      <ProtectedRoutes />
    </Router>
  );
}

export default App;
