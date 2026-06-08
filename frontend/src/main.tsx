import React from "react";
import ReactDOM from "react-dom/client";
import {
  Activity,
  Bell,
  CalendarDays,
  ChefHat,
  Gauge,
  Salad,
  Upload
} from "lucide-react";
import "./styles/global.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";

const navItems = [
  { label: "Dashboard", icon: Gauge },
  { label: "Assessment", icon: Activity },
  { label: "Ingredients", icon: Upload },
  { label: "Recipes", icon: ChefHat },
  { label: "Meal Plans", icon: CalendarDays },
  { label: "Progress", icon: Salad },
  { label: "Notifications", icon: Bell }
];

const summaries = [
  { label: "Daily calories", value: "2,150 kcal" },
  { label: "Protein target", value: "135 g" },
  { label: "Current BMI", value: "22.8" },
  { label: "Meals planned", value: "3 today" }
];

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <span className="brand-mark">F</span>
          <div>
            <strong>Foodier</strong>
            <span>Health planner</span>
          </div>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button className="nav-button" key={item.label} type="button">
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">API: {apiBaseUrl}</p>
            <h1>Healthy lifestyle dashboard</h1>
          </div>
          <button className="primary-action" type="button">
            <Activity size={18} aria-hidden="true" />
            New assessment
          </button>
        </header>

        <section className="summary-grid" aria-label="Health summary">
          {summaries.map((item) => (
            <article className="metric-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="panel">
            <h2>Assessment</h2>
            <p>Capture age, gender, height, weight, activity level, and health goal.</p>
            <button type="button">Open form</button>
          </article>
          <article className="panel">
            <h2>Ingredients</h2>
            <p>Upload an ingredient image or enter available ingredients manually.</p>
            <button type="button">Add ingredients</button>
          </article>
          <article className="panel">
            <h2>Meal plan</h2>
            <p>Generate a daily or weekly plan balanced against calories and macros.</p>
            <button type="button">Create plan</button>
          </article>
          <article className="panel">
            <h2>Progress</h2>
            <p>Track measurements, BMI history, and goal achievement trends.</p>
            <button type="button">Log progress</button>
          </article>
        </section>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

