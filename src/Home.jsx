import "./index.css";
import "./App.css";
import Navbar from './components/Navbar';
import WalletBanner from './components/WalletBoard';
import DashboardBodySection from "./components/DashboardBodySection";

function Home() {
  return (
    <>
      <div className="grid-container">
    <Navbar />
    <WalletBanner />
        <DashboardBodySection />
      </div>
    </>
  
  );
}

export default Home;