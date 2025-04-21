
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieCard from "@/components/MovieCard";
import { useApp } from "@/context/AppContext";
import { sampleMovies } from "@/data/movieData";

const Index = () => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useApp();
  
  // Show only 4 popular movies on the landing page
  const popularMovies = sampleMovies.slice(0, 4);

  const handleAddToFavorites = (movie: any) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="min-h-screen bg-netflixBlack">
      <Navbar />
      <HeroBanner />
      
      <section className="px-6 md:px-16 py-12 max-w-screen-xl mx-auto -mt-16 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Popular Movies</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="movie-card-hover">
              <MovieCard 
                movie={movie} 
                onAddToFavorites={handleAddToFavorites}
                isFavorite={isFavorite(movie.id)}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate("/preferences")}
            className="netflix-btn"
          >
            Get Personalized Recommendations
          </button>
        </div>
      </section>
      
      <section className="px-6 md:px-16 py-16 bg-netflixGray">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Discover Your Next Favorite Movie</h2>
              <p className="text-gray-300 mb-6">
                Cine Noir analyzes your preferences to recommend movies you'll love. 
                Tell us your favorite genres, actors, and directors, and we'll do the rest.
              </p>
              <button 
                onClick={() => navigate("/preferences")}
                className="netflix-btn"
              >
                Start Now
              </button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-full h-full bg-netflixRed rounded-md"></div>
                <img 
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=725&q=80"
                  alt="Movie collection" 
                  className="relative z-10 rounded-md w-full h-auto shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="px-6 md:px-16 py-8 bg-netflixBlack border-t border-netflixGray">
        <div className="max-w-screen-xl mx-auto text-center text-gray-400">
          <p>© 2025 Cine Noir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
