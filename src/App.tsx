import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Victim from "./pages/Victim";
import NGO from "./pages/NGO";
import StateOfficial from "./pages/StateOfficial";
import Central from "./pages/Central";
import Admin from "./pages/Admin";
import Auditor from "./pages/Auditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/victim" element={<Victim />} />
          <Route path="/ngo" element={<NGO />} />
          <Route path="/state-official" element={<StateOfficial />} />
          <Route path="/central" element={<Central />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auditor" element={<Auditor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
