import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Superheroes Database</h1>
      <p>Explore all your favorite heroes and villains with their abilities, universe, and power ratings.
        Step into a universe where Marvel, DC Comics and Dark Horse collide.
        Here, iconic heroes, ruthless villains and unforgettable anti-heroes share the same stage.
      </p>
      <p>
        Explore character profiles, discover hidden origins, compare abilities and see how your favorite figures evolve across different eras and storylines.
      </p>
      <p>
        Whether you're fascinated by the dark streets of Gotham, the cosmic realms of Asgard, or the gritty worlds of Hellboy and Sin City — this is your headquarters for everything comics.
      </p>
      <p>
        Build your own roster of characters and shape your personal multiverse.
      </p>

      <Link to="/characters">View All Characters</Link>
    </div>
  );
};

export default HomePage;
