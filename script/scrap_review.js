const gplay = require('google-play-scraper');
const fs = require('fs');

const apps = [
  { id: 'com.shopeepay.id', name: 'Shopeepay' },
  { id: 'com.gojek.gopay', name: 'Gopay' },
  { id: 'ovo.id', name: 'Ovo' },
];

const getReviews = async (app) => {
  const result = await gplay.reviews({
    appId: app.id,
    sort: gplay.sort.NEWEST,
    num: 200,
    lang: 'id',
    country: 'id',
  });

  return result.data.map((r) => ({
    AppName: app.name,
    User: r.userName,
    Rating: r.score,
    Review: r.text,
    Date: r.date,
    ThumbsUp: r.thumbsUp,
  }));
};

(async () => {
  let allReviews = [];

  for (const app of apps) {
    console.log(`Fetching ${app.name}...`);
    const reviews = await getReviews(app);
    allReviews = allReviews.concat(reviews);
  }

  fs.writeFileSync(
    'multi_app_reviews.json',
    JSON.stringify(allReviews, null, 2)
  );

  console.log('Done! Data saved to multi_app_reviews.json');
})();
