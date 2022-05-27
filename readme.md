## Music Service APP

**Server**

-   Typescript
-   Node
-   Express
-   Redis (caching solution)

## Run the App

App is dockerized. Hence, Docker needs to be up and running on the system.

After cloning the repo:

```sh
npm install
```

and start with :

```sh
npm start
```

       OR

```sh
yarn start
```

as you see fit.

If you are using docker:

```sh

docker-compose up --build

```

This will build the docker images and start the app.

> If you face any issue after running `docker-compose up` command, please kill the server and restart again. Prolly, compiller issues from TS.

### Ports

This backend Service is exposed on the port `5001`.

### Architectural flow

## Seed MBID:

```sh
494e8d09-f85b-4543-892f-a5096aed1cd4

d262ea27-3ffe-40f7-b922-85c42d625e67

1138a764-2212-4d0a-b02d-0dc14df91e08
```

You can get more from MBID for search from this url: https://musicbrainz.org/search?query

#### Search & Cache functionality

As a user, when you append in a search string {:/mbid} at the end of the url param, the app first checks for the results stored in the temporary **cache**, else it makes an API call to the server to fetch the results, as well as cache the results for that session.

For the purposes of caching, the search query is stringified and used as the cache key. If the user makes the same search again within the current session, the fetch time is cut by 80% due to the data from the temporary cache - thus avoiding any unnecessary calls to the server.

### API Endpoints

List of available routes:

**Auth routes**:

`GET /musify/music-artist/details/:mbid` - Get the full info of the Artist

`POST /_status` - basic Health check

#### Server

Once the backend receives a request, it first checks for the results in its cache. This cache is maintained in **Redis** database. If the results are not found in the cache, it then calls the `music brainz api` for the search results.

After the results are received, it first formats the results in the necessary format which is easier for the frontend to consume. It then caches this formatted data to the `redis store` and returns the result to the client.

are cached in the `redis` store for upto **2 days**. Once again the key used for storing the cache is the stringified search string/query.

#### Scalability Mechanism

The app has been load tested with K6 and seemed pretty decent in handling concurrency.

Also, NGINX was introduced as a load balancer to smoothen the effect on the machine.

### NUANCES

Due to the likelihood of some front images been unavailable, a check was used in picking the CD cover image from the results.

A lot of design patterns were used to make the app more robust and scalable. Services and middlewares were used to divide the app into smaller parts.

Errors are handled with custom ErrorHandlers.

#### Things to add / improve

-   configure CI/CD for the app
-   etc...
