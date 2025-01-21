import React from "react";
import { BrowserRouter as Router, Routes, Route , Switch} from "react-router-dom";
import { EventList, FeaturedEvents, EventDetails, CreateEventForm, DeleteEvent } from ".\views\view.js";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EventList from "./components/EventList";

const App = () => {
  return (
    <div>
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
      </div>    
  );
};

// Wrapper for EventDetails to handle route parameter
const EventDetailsWrapper = () => {
  const { id } = useParams();
  return <EventDetails eventId={id} />;
};

// Wrapper for DeleteEvent to handle route parameter
const DeleteEventWrapper = () => {
  const { id } = useParams();
  return <DeleteEvent eventId={id} />;
};

export default App;
