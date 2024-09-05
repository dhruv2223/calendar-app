import "./App.css";
import { Calendar } from "../components/Calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    <QueryClientProvider client={queryClient}>
      <div>
        <Calendar></Calendar>
      </div>
    </QueryClientProvider>
  );
}

export default App;
