const pubsub = require('@getg5/g5-pub-sub-js');
const projectId = process.env.PROJECT_ID;
const hubClentsSubscription = process.env.HUB_CLIENTS_SUBSCRIPTION;
const hubLocationsSubscription = process.env.HUB_LOCATIONS_SUBSCRIPTION;

module.exports = (app, express, models) => {
  try {
    pubsub.init(app, express, models);
    pubsub.subscribeClientUpdate(projectId, hubClentsSubscription);
    pubsub.subscribeLocationUpdate(projectId, hubLocationsSubscription);
  } catch (err) {
    console.log(err.message);
  }
};