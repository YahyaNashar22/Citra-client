import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "./routes/AppRoutes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
