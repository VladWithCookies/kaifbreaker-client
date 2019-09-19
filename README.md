# PWA используя React & Apollo Client

## Что мы хотим сделать?

Хотим сделать веб-приложение которые бы максимально походило на нативное.

Хотим чтобы оно могло:
* Запускаться с иконки на домашнем экране
* Работать в отдельном окне
* Работать без подключения к сети
* Отправлять пуш нотификации

## Что будем использовать
### PWA
https://developers.google.com/web/progressive-web-apps/

### Apollo client под react
https://www.apollographql.com/docs/react/

## Где я украл это подход? (Ну не сам же я его придумал)
https://medium.com/twostoryrobot/a-recipe-for-offline-support-in-react-apollo-571ad7e6f7f4

https://codeburst.io/highly-functional-offline-applications-using-apollo-client-12885bd5f335

https://habr.com/p/450504/

## Шаг 1. Выглядеть как нативное приложение
### App manifest

https://developers.google.com/web/fundamentals/web-app-manifest/

Важные для нас опции app manifest:

`name` - название приложения, которое будет показано при запросе на добавление иконки на домашний экран 

`short_name` - короткое название приложения. Его можно будет увидеть на домашнем экране, ну или там где места маловато для полного названия

`background_color` - цвет загрузочного экрана

`display` - может принимать несколько значений. кастомизирует ui браузера. Я выбрал `standalone`. `standalone` значит что:

* Приложение будет запущено в отдельном окне, независимо от браузера.
* Стандартный ui браузера будет спрятан. Например строка ввода url

`scope` - скоуп урлов нашего приложения, используюется чтобы понять, когда пользователь покинул приложение.

`start_url` - урл с которого приложение стартует. полезно для того чтобы юезр открывал нужную нам страницу кликая по иконке на домашнем экране, а не ту на которой он добавил эту иконку на домашний экран

`theme_color` - цвет тул бара

`icons` - набор иконок которые будут юзаться на домашнем экране, app launcher, task switcher, загрузочном экране, итд.

У меня получился такой манифест:
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
Offline first или cache first - это такая популярная стратегия доставки контента юзеру. Суть в том что если ресурс закеширован и доступен офлайн, то мы в первую очереди будем возвращать ресурс и кеша при попытке скачать его с сервера. Если в кеше ресурса нет, то мы скачаем его с сервера, а потом добавим в кеш. Цикл замкнулся.

### Кещирование 
Чтобы приложение можно было открыть без доступа к сети, нужно чтобы его файлы (js, html, css, картиночки) были в кеше. Это решается с помошью сервис воркера. Нам нужно написать сервис воркер который бы добавлял эти файлы в кеш и отдавал их юзеру из кеша когда они будут нужны ему.

Я использовал create-react-app, а там уже был встроенный сервис воркер, поэтому для меня все обошлось тем, что я просто поменял`serviceWorker.unregister();` на `serviceWorker.register();`в `index.js`

Файлы теперь кешируются и мы можем использовать приложение без подключения к сети. Не то чтобы прям использовать, потому что все запросы к серверу будут падать, так как подключения к сети нет. Сейчас мы разве что можем просматривать статические страници, что не очень интересно.

### Оффлайн запросы
Суть в том что apollo записывает ответы от сервера в свой кеш. Можно взять и записать этот кеш куда-нибудь (я имею ввиду local storage), так чтобы его не потерять. Затем при старте приложения достать кеш из локал стореджа и инициализировать им кеш apollo. Цикл замкнулся. Таким образом у нас будут данные чтобы показать пользователю, когда соеденение пропало.

Для этой цели буде полезен `apollo-cache-persist`

https://blog.apollographql.com/announcing-apollo-cache-persist-cb05aec16325

Добавляю `apollo-cache-persist`
```js
// src/apolloClient.js
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { CachePersistor } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'

const API_HOST = 'http://localhost:3000/graphql'

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

const getApolloClient = async () => {
  const httpLink = new HttpLink({ uri: API_HOST })
  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
  })

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore()
  } else {
    await persistor.purge()
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  const client = new ApolloClient({
    httpLink,
    cache,
  })

  return client
}

export default getApolloClient
```

Добавляю лоадер чтобы показывать его пока кеш apollo инициализируется кешем из local storage.
```js
// src/components/App/container.js

import React, { useEffect, useState } from 'react'

import getApolloClient from '../../apolloClient'
import AppComponent from './component'

export default function App() {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApolloClient().then((client) => {
      setClient(client)
      setLoading(false)
    })
  }, [])

  return <AppComponent client={client} loading={loading} />
}
```

```js
/src/components/App/component.js

import React from 'react'
import { ApolloProvider } from 'react-apollo'

import Loader from '../Loader'
import Router from '../../Router'
import useStyles from './styles'

export default function App({ client, loading }) {
  const classes = useStyles()

  if (loading) {
    return (
      <div className={classes.loaderContainer}>
        <Loader />
      </div>
    )
  }

  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  )
}
```

### Офлайн мутации (звучит жутко)
TODO

## Step 3. Пуш нотификации
TODO
