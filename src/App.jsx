import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import './App.css'
import Wallet from './app/Wallet';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>}/>
          <Route path="*" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/wallets" element={<PublicRoute><Wallet /></PublicRoute>} />
          {/* <Route path="/user/deposit" element={<PrivateRoute><Deposit /></PrivateRoute>} />
          <Route path="/deposit/naira" element={<PrivateRoute><Deposit /></PrivateRoute>} />
          <Route path="/user/add-bank" element={<PrivateRoute><AddNewBank /></PrivateRoute>} />
          <Route path="/auth/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
          <Route path="/service/airtime" element={<PrivateRoute><Airtime /></PrivateRoute>} />
          <Route path="/service/data" element={<PrivateRoute><DataBundle /></PrivateRoute>} />
          <Route path="/service/cabletv" element={<PrivateRoute><CableTv /></PrivateRoute>} />
          <Route path="/chart" element={<PrivateRoute><CandleStickChart /></PrivateRoute>} /> */}

          {/* <Route path="/auth/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
          <Route path="/auth/forget-password" element={<PublicRoute><ForgetPassword /> </PublicRoute>} />
          <Route path="/auth/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/auth/login" element={<PublicRoute><Login /> </PublicRoute>} />
          <Route path="/auth/account-verification" element={<PublicRoute><AccountVerification /> </PublicRoute>} />
          <Route path="/notfound" element={<PublicRoute><NotFound /> </PublicRoute>} />
          <Route path="/404" element={<PublicRoute><NotFound /> </PublicRoute>} />
           */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;