import { useState } from 'react'
import { Dropdown } from './ui/dropdown'
import { SearchInput } from './ui/search-input'
import { EpisodeItem } from './ui/episode-item'


export default function StreamingInterface({anime_id, seasonG='Season 1', episodes, poster, trailer}) {
  const [season, setSeason] = useState(seasonG)
  const [search, setSearch] = useState('')
  const [sortCriteria, setSortCriteria] = useState('number')

  const filteredEpisodes = episodes.filter(episode =>
    episode.title.toLowerCase().includes(search.toLowerCase()) ||
    episode.number.toString().includes(search)
  )

  const sortedEpisodes = filteredEpisodes.sort((a, b) => {
    if (sortCriteria === 'title') {
      return a.title.localeCompare(b.title)
    } else if (sortCriteria === 'number') {
      return a.number - b.number
    }
    return 0
  })

  return (
    <div className="max-h-[80vh] text-white p-6">
        <div className="flex gap-4 items-baseline space-y-4 mb-4">
          <div className="w-48">
            <Dropdown
              value={season}
              onChange={setSeason}
              options={['Season 1', 'Season 2', 'Season 3']}
            />
          </div>
          <div className=" flex-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search episode..."
            />
          </div>
          <div className="w-48">
            <Dropdown
              value={sortCriteria}
              onChange={setSortCriteria}
              options={['title', 'number']}
            />
          </div>
        </div>
      <div className="max-w-screen max-h-[60vh] mx-auto space-y-6 overflow-y-auto"
      style={{
        // Beautiful sleek scrollbar
        scrollbarWidth: 'thin',
        scrollbarColor: '#4B5563 #1F2937',
        scrollbarGutter: '1px',
      }}
      >
        <div>
          <div className="space-y-4">
            {episodes && sortedEpisodes.map((episode) => (
              <EpisodeItem
                id={anime_id}
                ep_id={episode.episodeId}
                key={episode.number}
                number={episode.number}
                title={episode.title}
                description={episode.description}
                thumbnail={episode.thumbnail || poster}
              />
            ))}
          </div>
        </div>
      </div>
      {
        trailer && (

        <div className="pt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full" />
            Trailer
          </h2>
        </div>
        )
      }
    </div>
  );
}