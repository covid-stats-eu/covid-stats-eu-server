// Import all routes and then import this file in app.js 
import activityRouter from './routes/activity.js'; // this will be transfered to router.js
import countryRouter from './routes/country.js';

export {
    activityRouter,
    countryRouter,
}