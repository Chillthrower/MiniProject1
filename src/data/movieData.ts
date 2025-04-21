
import { Movie } from "@/components/MovieCard";

export const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=687&q=80",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    year: "2010",
    rating: "PG-13",
    genres: ["Sci-Fi", "Action", "Thriller"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=687&q=80",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    year: "2008",
    rating: "PG-13",
    genres: ["Action", "Crime", "Drama"],
  },
  {
    id: 3,
    title: "La La Land",
    poster: "https://images.unsplash.com/photo-1559108318-39ed452bb6c9?auto=format&fit=crop&w=688&q=80",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    year: "2016",
    rating: "PG-13",
    genres: ["Comedy", "Drama", "Music"],
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    poster: "https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?auto=format&fit=crop&w=687&q=80",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    year: "2019",
    rating: "PG-13",
    genres: ["Action", "Adventure", "Drama"],
  },
  {
    id: 5,
    title: "Parasite",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=725&q=80",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    year: "2019",
    rating: "R",
    genres: ["Comedy", "Drama", "Thriller"],
  },
  {
    id: 6,
    title: "The Godfather",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=725&q=80",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    year: "1972",
    rating: "R",
    genres: ["Crime", "Drama"],
  },
  {
    id: 7,
    title: "Interstellar",
    poster: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=735&q=80",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    year: "2014",
    rating: "PG-13",
    genres: ["Adventure", "Drama", "Sci-Fi"],
  },
  {
    id: 8,
    title: "Joker",
    poster: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=687&q=80",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    year: "2019",
    rating: "R",
    genres: ["Crime", "Drama", "Thriller"],
  }
];

export const genres = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", 
  "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", 
  "Music", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
];

export const languages = [
  "English", "Spanish", "French", "German", "Italian", "Japanese", 
  "Korean", "Chinese", "Russian", "Hindi", "Portuguese", "Arabic"
];

export function getRecommendations(preferences: {
  genres: string[];
  language: string;
  actors?: string;
  directors?: string;
}): Movie[] {
  return sampleMovies;
}
