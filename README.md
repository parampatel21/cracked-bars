## Clarum Take-Home Interview: Cracked Bars

### Intro:

Hi Tommy/Anton! I've promptly named the result of the take-home assignment: 'Cracked Bars'. If you want to check out the app, look at the link:

...or, if you'd like to compile it yourself, clone the repo and then run 'npm run dev' & 'npm install'. You'll need to create a .env.local in your root directory and put in your own Polygon API key for the variable: 'POLYGON_API_KEY='

### Important To Note:

- The API is rate-limited to 5 requests per minute. It will trigger the error boundary if more requests are made.

### Features Implemented:

- Bar Chart w/ 20+ stocks
- Ability to refine view with time length, time span
- Ability to view 5000+ data points
- Suspend, error boundary paradigms implemented
- SSR-heavy implementation
- Sleek interface, ability to see price, volume, H/L data points per timespan unit

### Caveats, To-dos (If I had more time):

- Tailwind CSS cleanup/restructure (universal theming, maybe?), it's messy in some components right now with some redundancy.
- I could have cached the data on first pull. Right now, the data is fetched from the API for every request combination. Had I more time, I would have fetched the largest set (1M, by minute) and then calculated the aggregates accordingly for whatever request was made.
- The only point here I missed was the click-to-delete bar feature, which consequently I could have integrates
- Better mobile interface could be integrated, performance is iffy at 15k+ datapoints
- Standardize date formatting
- 404 or route handling not set up
