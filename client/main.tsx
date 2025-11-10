import "./global.css";
import { createRoot, type Root } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root not found");

// Reuse root across HMR to avoid createRoot warning
const w = window as unknown as { __app_root?: Root };
const root = w.__app_root ?? createRoot(container);
w.__app_root = root;
root.render(<App />);
