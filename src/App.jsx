import "./App.css";
import { Calendar } from "../components/Calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import { PomodoroPage } from "../components/PomodoroPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      scaleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/pomodoro/:date/:month/:year"
            element={<PomodoroPage></PomodoroPage>}
          ></Route>
          <Route index element={<Calendar></Calendar>}></Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
