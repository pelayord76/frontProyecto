import App from "./App.jsx";
import "./main.css";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(<App />);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );