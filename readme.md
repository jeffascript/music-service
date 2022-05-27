## GIF SEARCH APP

**Client**
The web app is bootstrapped using `create-react-app`.

- Typescript

- React ( ContextAPI for temporary caching and Hook for Clipboard copy/paste events )

- Redux/toolkit (newest redux library from redux team)

- Redux-persist (to persist the bookmarked GIFs for later use)

**Server**

- Typescript
- Node
- Express
- Redis (caching solution)

## DEMO

Click on the Links below to watch the DEMO for all the functionalities implemented.

PART A: https://www.loom.com/share/3ee415f15dcf485b82dd8c7e490780b1

PART B: https://www.loom.com/share/864d0034c02d46299ac6fb64c1f5ffbc

## Run the App

App is dockerized. Hence, Docker needs to be up and running on the system.

After cloning the repo:

```sh
docker-compose up --build
```

This will build the docker images and start the app.

> If you faceany issue after running `docker-compose up` command, please kill the server and restart again. Prolly, compiller issues from TS.

### Ports

The app can be accessed at `http://localhost:3000`. The backend is exposed on the port `5001`.

### Architectural flow

## Client

#### 1. Search & Cache functionality

As a user, when you type in a search string in the search field, the app first checks for the results stored in the temporary **cache**, else it makes an API call to the server to fetch the results, as well as cache the results for that session.

For the purposes of caching, the search query is stringified and used as the cache key. If the user makes the same search again within the current session, the `ui state` is updated from the temporary cache thus avoiding any unnecessary calls to the server.

> Reason for the temporary cache with `ContextAPI` here is due to the fact that we are still caching the results in the server with REDIS, hence, api calls will have low latency time to refetch data based on cached search string.

The inputed search string is expected to be more than `3` letters, else no result or api calls would be made.

#### 2. Bookmark Functionality

Each Gif has the possibilty to be bookmarked or copied upon hover.

If a user clicks on `bookmark` on a hovered Gif, the Gif is saved on the `gallery pane` and the `badge count` gets updated accordingly. On the Gallery Pane, user has the possibility of `unbookmarking` the Gifs that was previously bookmarked.

> The bookmarking logic was implemented with `Redux` and stored on the local storage for persistence even after a session is been completed by a user. The result is persisted in the local storage, so that even if the app is refreshed, the redux records are maintained.

#### 2. Copy to Clipboard Functionality

If a user clicks on `copy` on a hovered Gif, the url of the Gif is copied and formatted for use on a Markdown Text editor.

> Playground: User can paste here to see the copied Gif https://markdown-it.github.io/

#### Server

Once the backend receives a request, it first checks for the results in its cache. This cache is maintained in **Redis** database. If the results are not found in the cache, it then calls the `gif api` for the search results.

After the results are received, it first formats the results in the necessary format which is easier for the frontend to consume. It then caches this formatted data to the `redis store` and returns the result to the client.

The results are cached in the `redis` store for upto **2 days**. Once again the key used for storing the cache is the stringified search string/query.

#### APIs

Frontend only needs to call a single api regardless of the entity type you are searching for -

endpoint - `/api/gifs`
method - `POST`
body -

```typescript
{
  "searchString" : string;

}
```

The data is validated in the server with `express-validator` and if any of the required fields are missing, it throws an error. Also, the string should be more than 3 letters to fetch results.

#### Things to add / improve

- Add more unit tests for both client and server.
