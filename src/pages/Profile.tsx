
import Navbar from "@/components/Navbar";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { genres } from "@/data/movieData";

const Profile = () => {
  const { preferences, favorites, setPreferences } = useApp();
  const navigate = useNavigate();

  const resetPreferences = () => {
    if (confirm("Are you sure you want to reset your preferences?")) {
      setPreferences({ genres: [], language: "English" });
      navigate("/preferences");
    }
  };

  const topGenres = () => {
    if (!favorites.length) return [];
    
    const genreCounts: Record<string, number> = {};
    
    favorites.forEach(movie => {
      movie.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });
    
    return Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);
  };

  return (
    <div className="min-h-screen bg-netflixBlack">
      <Navbar />
      
      <div className="pt-24 px-6 md:px-16 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-netflixGray rounded-lg overflow-hidden shadow-xl">
            <div className="p-6 md:p-8 bg-gradient-to-r from-netflixRed/90 to-netflixRed/70">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-netflixGray overflow-hidden border-4 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="Profile picture" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">Your Profile</h1>
                  <p className="text-white/80 mt-1 text-center md:text-left">Manage your preferences and favorites</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Viewing Preferences</h2>
                
                {preferences ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-400 text-sm">Favorite Genres</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {preferences.genres.map(genre => (
                          <span key={genre} className="px-3 py-1 bg-netflixRed/20 text-white rounded-full text-sm">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-400 text-sm">Preferred Language</h3>
                      <p className="text-white">{preferences.language}</p>
                    </div>
                    
                    {preferences.actors && (
                      <div>
                        <h3 className="text-gray-400 text-sm">Favorite Actors</h3>
                        <p className="text-white">{preferences.actors}</p>
                      </div>
                    )}
                    
                    {preferences.directors && (
                      <div>
                        <h3 className="text-gray-400 text-sm">Favorite Directors</h3>
                        <p className="text-white">{preferences.directors}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => navigate("/preferences")}
                        className="px-4 py-2 bg-netflixGray border border-white/20 text-white rounded-md hover:bg-netflixDarkGray transition-colors"
                      >
                        Edit Preferences
                      </button>
                      <button 
                        onClick={resetPreferences}
                        className="px-4 py-2 bg-netflixGray border border-white/20 text-white rounded-md hover:bg-netflixDarkGray transition-colors"
                      >
                        Reset Preferences
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-300 mb-4">You haven't set any preferences yet</p>
                    <button 
                      onClick={() => navigate("/preferences")}
                      className="netflix-btn"
                    >
                      Set Preferences
                    </button>
                  </div>
                )}
              </section>
              
              <div className="border-t border-netflixDarkGray my-6"></div>
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Viewing History</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-400 text-sm">Favorites Count</h3>
                    <p className="text-white text-xl font-medium">{favorites.length} movies</p>
                  </div>
                  
                  {favorites.length > 0 && (
                    <div>
                      <h3 className="text-gray-400 text-sm">Top Genres Based on Favorites</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {topGenres().map(genre => (
                          <span key={genre} className="px-3 py-1 bg-netflixRed/20 text-white rounded-full text-sm">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <button 
                      onClick={() => navigate("/favorites")}
                      className="netflix-btn"
                    >
                      View Favorites
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
