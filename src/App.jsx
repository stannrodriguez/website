// App.jsx
import "./App.css";
import Graph from "./components/Graph";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Stephanie Rodriguez</h1>
        <p className="subtitle">Building technology that elevates the human spirit</p>
      </header>

      <main>
        <Graph />
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Stephanie Rodriguez</p>
      </footer>
    </div>
  );
}

export default App;
