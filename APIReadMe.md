http://localhost:4000/api/v2/hianime/search?q=Bleach&page=1

Output:
{
  "success": true,
  "data": {
    "animes": [
      {
        "id": "bleach-thousandyear-blood-war-the-separation-18420",
        "name": "Bleach: Thousand-Year Blood War - The Separation",
        "jname": "Bleach: Sennen Kessen-hen - Ketsubetsu-tan",
        "poster": "https://cdn.noitatnemucod.net/thumbnail/300x400/100/0f474e6ea130efd9372f913356037955.jpg",
        "duration": "24m",
        "type": "TV",
        "rating": "18+",
        "episodes": {
          "sub": 13,
          "dub": 13
        }
      },
    ]
    }
}




http://localhost:4000/api/v2/hianime/anime/bleach-thousandyear-blood-war-the-separation-18420/episodes

Output:

{
  "success": true,
  "data": {
    "totalEpisodes": 13,
    "episodes": [
      {
        "title": "The Last 9 Days",
        "episodeId": "bleach-thousandyear-blood-war-the-separation-18420?ep=102994",
        "number": 1,
        "isFiller": false
      },
      {
        "title": "Peace from Shadows",
        "episodeId": "bleach-thousandyear-blood-war-the-separation-18420?ep=103072",
        "number": 2,
        "isFiller": false
      },
    ]
  }
}




http://localhost:4000/api/v2/hianime/episode/sources?animeEpisodeId=bleach-thousandyear-blood-war-the-separation-18420?ep=102994&server=hd-1&category=dub


Output:

{
  "success": true,
  "data": {
    "tracks": [
      {
        "file": "https://s.megastatics.com/thumbnails/777c8ec439174983c4510579a2b10b40/thumbnails.vtt",
        "kind": "thumbnails"
      }
    ],
    "intro": {
      "start": 78,
      "end": 167
    },
    "outro": {
      "start": 1355,
      "end": 1450
    },
    "sources": [
      {
        "url": "https://fds.biananset.net/_v7/470186ee10fc1973f04af6f9fa4f19b23e7e071b447d34d10e38bbf472bccdd4de6fc13d066fea6ce80ee508b791361c0bc19e998dfa4a62dbd0e3c57b949455ab32e5fe4c7585ab5f0bb16c59aec300121d0c4a51185d029a07403b043d92cc76f7014612813d627603086a9cce7ab145e7eea25f86e54c656d7bf7531d004a/master.m3u8",
        "type": "hls"
      }
    ],
    "anilistID": 159322,
    "malID": 53998
  }
}




