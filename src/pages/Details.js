import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Navbar } from "../components/navbar-netflix";
import Navbar from "../components/Navbar/Navbar_2";
import { HeroBanner } from "../components/hero-banner";
import { ContentRow } from "../components/content-row";
import { ContentCard } from "../components/content-card";
import CustomFooter from "../components/footer";

export default function AnimeDetails({ Anime_ID }) {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const navigate = useNavigate();
  const location = useLocation();

  const [mainEpLoaded, setMainEpLoaded] = useState(false);
  const [animeList, setAnimeList] = useState(null);
  const [recommendedList, setRecommendedList] = useState([]);

  const [moreInfo, setMoreInfo] = useState(null);

  const fetchInfo = async (query) => {
    try {
      setMainEpLoaded(false);
      const response = await fetch(
        `${API_ENDPOINT}/api/v2/hianime/anime/${query}`
      );
      const data = await response.json();
      console.log(data.data.anime);
      const moreInfo = await getAdditionData(data.data.anime.info.malId);
      setMoreInfo(moreInfo);

      setAnimeList(data.data.anime);
      setRecommendedList(data.data.recommendedAnimes);
      setMainEpLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getAdditionData = async (malId) => {
    try {
      const result = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
      const data = await result.json();
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const query = Anime_ID || new URLSearchParams(location.search).get("id");
    if (query) {
      fetchInfo(query);
    } else {
      navigate("/home");
    }
  }, [Anime_ID, location]);

  const handlePlay = () => {
    navigate(`/watch?query=${animeList?.info?.id}`);
  };

  if (!mainEpLoaded) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="animate-pulse">
          <div className="h-[85vh] bg-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />

      <HeroBanner
        title={animeList.name}
        description={animeList.info.description}
        coverImage={
          moreInfo?.trailer?.images?.maximum_image_url || animeList.info.poster
        }
        onPlay={handlePlay}
      />

      <div className="relative z-10 -mt-32">
        <div className="space-y-8">
          <div className="px-4">
            <div className="flex flex-col px-4 gap-4 text-white text-sm">
              <span>{animeList.moreInfo.genres.join(" • ")}</span>
              <br />
              <span>
                {animeList.info.stats.episodes?.sub &&
                  `${animeList.info.stats.episodes.sub} Episodes (Sub)`}
                {animeList.info.stats.episodes?.dub &&
                  ` | ${animeList.info.stats.episodes.dub} Episodes (Dub)`}
                  {animeList.moreInfo?.duration && ` | ${animeList.moreInfo.duration}`}
              </span>
              <br />
              
            </div>
          </div>

          {recommendedList.length > 0 && (
            <ContentRow title="More Like This">
              {recommendedList.slice(0, 12).map((anime) => (
                <ContentCard
                  key={anime.id}
                  title={anime.name}
                  image={anime.poster}
                  onClick={() => navigate(`/details?id=${anime.id}`)}
                />
              ))}
            </ContentRow>
          )}
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}
