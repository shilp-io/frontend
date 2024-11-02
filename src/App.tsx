import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import Router from "./routes";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
