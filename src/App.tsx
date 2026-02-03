import "./App.css";
import MainScreen from "./components/main-screen";
import MainAside from "./components/main-aside";
import { MainScreenProvider } from "./context/main-screen.context";
import MainConfigModal from "./components/main-config-modal";

function App() {
  return (
    <main className="h-screen w-screen flex overflow-by-layout">
      <MainScreenProvider>
        <MainConfigModal />
        <MainAside />
        <MainScreen />
      </MainScreenProvider>
    </main>
  );
}

export default App;
