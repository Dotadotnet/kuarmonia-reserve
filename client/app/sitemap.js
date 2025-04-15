export default async function sitemap() {
  const sitemap = [];

  const post_res = await fetch(process.env.API + '/post/get-posts');
  const posts = await post_res.json();

  posts.data.forEach(post => {
  sitemap.push(  {
    url: post.canonicalUrl,
    lastModified: post.lastUpdated,
    changeFrequency: 'monthly',
    priority: 0.5,
  })
});

  return sitemap;
}