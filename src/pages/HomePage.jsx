import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Superheroes Database</h1>
      <p>Explore all your favorite heroes and villains with their abilities, universe, and power ratings.</p>
      <Link to="/characters">View All Characters</Link>
    </div>
  );
};

export default HomePage;
