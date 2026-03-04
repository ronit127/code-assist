import ytSearch from 'yt-search';

export async function searchRelatedContent(topics, language) {
  if (!topics || topics.length === 0) return [];

  const primaryTopic = topics[0];
  const secondaryTopic = topics[1] || topics[0];

  const [soLinks, ytLinks] = await Promise.allSettled([
    searchStackOverflow(primaryTopic + ' ' + language),
    searchYouTube(secondaryTopic + ' ' + language + ' tutorial')
  ]);

  return [
    ...(soLinks.status === 'fulfilled' ? soLinks.value : []),
    ...(ytLinks.status === 'fulfilled' ? ytLinks.value : [])
  ];
}

async function searchStackOverflow(query) {
  const encoded = encodeURIComponent(query);
  const url = 'https://api.stackexchange.com/2.3/search/advanced?q=' + encoded + '&site=stackoverflow&sort=relevance&order=desc&pagesize=3&accepted=True&filter=default';

  const res = await fetch(url, { headers: { 'Accept-Encoding': 'identity' } });
  if (!res.ok) return [];

  const data = await res.json();
  const items = data.items || [];

  return items
    .filter(item => item.is_answered && item.score > 0)
    .slice(0, 2)
    .map(item => ({
      title: decodeHtmlEntities(item.title),
      url: item.link,
      type: 'stackoverflow',
      thumbnail: null
    }));
}

async function searchYouTube(query) {
  const result = await ytSearch({ query, pageSize: 5 });
  const videos = result.videos || [];

  return videos
    .filter(v => v.videoId && v.title)
    .slice(0, 2)
    .map(v => ({
      title: v.title,
      url: 'https://www.youtube.com/watch?v=' + v.videoId,
      type: 'youtube',
      thumbnail: 'https://img.youtube.com/vi/' + v.videoId + '/mqdefault.jpg'
    }));
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
