
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EventList from "./components/EventList";


const App = () => {
  return (
    <Router>
    <Navbar />
    <Switch>
    <Route exact path="/" component={HeroSection} />
    <Route path="/services" component={Services} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/events" component={EventList} /> 
    </Switch>
    <Footer />
  </Router>
  );
};

export default App;