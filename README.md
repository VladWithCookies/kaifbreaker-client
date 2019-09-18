# PWA using React & Apollo Client

## What we want to build

Web application with better mobile expirience. It should behave more like native mobile apps. 

So we need to have ability to:
* Run app from icon on the screen
* Run app in own window
* Use app without internet 
* Receive notifications even when app is not running

## What we will use 
### PWA
https://developers.google.com/web/progressive-web-apps/

### Apollo client for react
https://www.apollographql.com/docs/react/

## Where was i stole this?
https://medium.com/twostoryrobot/a-recipe-for-offline-support-in-react-apollo-571ad7e6f7f4

https://codeburst.io/highly-functional-offline-applications-using-apollo-client-12885bd5f335

https://habr.com/p/450504/

## Step 1. Native look
### App manifest
https://developers.google.com/web/fundamentals/web-app-manifest/

Some of useful app manifest options:

`name` - is used in the app install prompt

`short_name` - is used on the user's home screen, launcher, or other places where space may be limited

`background_color` - used on the user's home screen, launcher, or other places where space may be limited

`display` - customize what browser UI is shown when your app is launched. I've choosed `standalone`. `standalone` means that:

* It runs in its own window, separate from the browser.
* It hides standard browser UI elements like the URL bar, etc.

`scope` - defines the set of URLs that the browser considers to be within your app, and is used to decide when the user has left the app.

`start_url` - is url where your application should start when it is launched, and prevents the app from starting on whatever page the user was on when they added your app to their home screen.

`theme_color` - sets the color of the tool bar, and may be reflected in the app's preview in task switchers.

`icons` - is set of icons for the browser to use. These icons are used in places like the home screen, app launcher, task switcher, splash screen, etc.

My manifest file looks like this:
```json
{
  "name": "КАЙФОЛОМ",
  "short_name": "КАЙФОЛОМ",
  "background_color": "#039be5",
  "display": "standalone",
  "scope": "/",
  "start_url": "/",
  "theme_color": "#039be5",
  "icons": [
    {
      "src": "images/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Step 2. Offline first
"The "offline first" — or "cache first" — pattern is the most popular strategy for serving content to the user. If a resource is cached and available offline, return it first before trying to download it from the server. If it isn’t in the cache already, download it and cache it for future usage." - From MDN

### Caching
We need to have ability to serve app files (js, html, css, images) when internet connection is absent. 
So we need to implement service worker. Service worker should add latest app files to cache and return it whenever client needs it. 

We are using create-react-app, so we jsut need to change `serviceWorker.unregister();` to `serviceWorker.register();` to use built in service worker.

Now all app files will be cached and app will be 'available' even without internet connection. But all requests from client will fails. So we need to implement ability to return latest fetched data when internet connection is lost. 

### Offline queries
We use apollo client. Apollo client is requestiong and caching data. We need to save fetched data somewhere to not fetch it again in next run. Local storage is applicable for this. So when we wiil fetch data with apollo, apollo will save it in his cache. After that we need to save apollo cache to local storage. Then in next run we will initilize apollo cache from cache stored in local storage. In this way we will achive offline content availability.

We will use apollo-cache-persist for this perpose.

https://blog.apollographql.com/announcing-apollo-cache-persist-cb05aec16325

### Offline mutations
TODO

## Step 3. Push notifications
TODO
