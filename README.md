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

## Где я украл этот подход? (Ну не сам же я его придумал)
https://medium.com/twostoryrobot/a-recipe-for-offline-support-in-react-apollo-571ad7e6f7f4

https://codeburst.io/highly-functional-offline-applications-using-apollo-client-12885bd5f335

https://habr.com/p/450504/

## Step 1. Выглядеть как нативное приложение
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
  "name": "PWA Demo",
  "short_name": "PWA Demo",
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

### Кеширование
Чтобы приложение можно было открыть без доступа к сети, нужно чтобы его файлы (js, html, css, картиночки) были в кеше. Это решается с помошью сервис воркера. Нам нужно написать сервис воркер который бы добавлял эти файлы в кеш и отдавал их юзеру из кеша когда они будут нужны ему.

Я использовал create-react-app, а там уже был встроенный сервис воркер, поэтому для меня все обошлось тем, что я просто поменял`serviceWorker.unregister();` на `serviceWorker.register();`в `index.js`

Файлы теперь кешируются и мы можем использовать приложение без подключения к сети. Не то чтобы прям использовать, потому что все запросы к серверу будут падать, так как подключения к сети нет. Сейчас мы разве что можем просматривать статические страници, что не очень интересно.

### Оффлайн запросы
Нужно сделать так чтобы при отсутствии подключения к сети пользователь мог увидеть тот контент который уже был загружен им ранее. Тут снова все решается кешированием. Только на этот раз не файлов приложения, а ответов от сервера. Суть в том что apollo уже записывает ответы от сервера в свой кеш. Звучит как будто все уже работает. Но если мы перезагрузим страницу то все сломается. Он (кеш) испарился!! (скрин с фильма про бэтмена, где джокер показывает фокус с карандашом). Можно взять и записать этот кеш куда-нибудь (я имею ввиду local storage), так чтобы его не потерять. Затем при старте приложения достать кеш из локал стореджа и инициализировать им кеш apollo. Цикл замкнулся. Таким образом у нас будут данные чтобы показать пользователю, когда соеденение пропало.

Для этой цели буде полезен `apollo-cache-persist`

https://blog.apollographql.com/announcing-apollo-cache-persist-cb05aec16325

Пример
```js
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

  return new ApolloClient({ link: httpLink, cache })
}

export default getApolloClient
```

Добавляю лоадер чтобы показывать его юзеру пока кеш apollo инициализируется кешем из local storage (на самомо деле делается это довольно быстро и лоадер особо даже и не поразглядываешь, но мало ли)
```js
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
Уже лучше, но а что если я хочу не просто просматривать последние полученные данные, а попытаться к примеру запостить какой-то пост или добавить таску в тудулист, а интернета нет. По хорошему нужно сделать так чтобы я мог это сделать без подключения к сети. То есть при создании поста, таски показать юзеру что все ок, вот твоя таска, пост, а когда будет интернет я ее еще и на сервер отправлю.

Начнем с того чтобы сказать юзеру что все ок:
В apollo уже есть механизм который позволяет это сделать. Называется optimistic response. Суть в том что мы можем показать пользователь какой-то ответ еще до того как реальный ответ прийдет с сервера. А когда настоящий ответ прийдет, то apollo обновит кеш реальными данными.

Примерчик с optimistic response (надо его порезать чутка, выпилить formik и прочее что не очень важно в данном контексте):

```js
import React, { useState } from 'react'
import { graphql } from 'react-apollo'

import { getProjects } from '../../../queries'
import { createProject } from '../../../mutations'
import NewProjectModalComponent from './component'

function NewProjectModal(props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = (values) => {
    const { mutate } = props

    mutate({
      variables: values,
      update: (cache, { data: { createProject } }) => {
        const data = cache.readQuery({ query: getProjects })

        data.projects.push(createProject)
        cache.writeQuery({ query: getProjects, data })
      },
      optimisticResponse: {
        createProject: {
          id: -1,
          __typename: 'Project',
          tasks: [],
          ...values,
        },
      },
      context: {
        serializationKey: 'CREATE_PROJECT',
      },
    })
  }

  return (
    <NewProjectModalComponent
      {...props}
      isOpen={isOpen}
      onOpen={handleToggleModal}
      onClose={handleToggleModal}
      onSubmit={handleSubmit}
    />
  )
}

export default graphql(createProject)(NewProjectModal)
```

А что дальше? Мы показали пользователю optimistic response, но нужно еще отправить его запрос, когда это будет возможно. Тут у нас будет целое комбо из библиотек:
*  apollo-link-retry (https://www.apollographql.com/docs/link/links/retry/)
*  apollo-link-queue (https://github.com/helfer/apollo-link-queue)
*  apollo-link-serialize (https://github.com/helfer/apollo-link-serialize)

Ничего себе, давайте по порядку:

Начнем с понимания такой штуки как apollo link.

https://www.apollographql.com/docs/link/overview/

1. `apollo-link-retry` - название говорит само за себя, эта линка при вознекновении ошибки сети попытается послать запрос еще раз через определенное время.

2. `apollo-link-queue` - как написано в ее readme: это как ворота, когда интернета нет, запросы собираются в очередь, пока ворота не откр
    const execute = async () => {
      const trackedQuerieоються.

3. `apollo-link-serialize` - фиксит одну забавную фичу apollo, которая нас может напрягать при использовании `apollo-link-queue`. Дело в том что apolllo екзекутит квери и мутации паралельно, а значит если мы выполнели две мутации в оффлайне моде, например создали что-то, а потом удалили, то когда соеденение вернеться то эти мутации отработат одновременно, что может привести к ошибкам.

Пример для всего и сразу, который нужно декомпозировать, возможно
```js
import Cookies from 'js-cookie'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import QueueLink from 'apollo-link-queue'
import { HttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import SerializingLink from 'apollo-link-serialize'
import { CachePersistor } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'

const API_HOST = process.env.NODE_ENV === 'production'
  ? 'https://cryptic-bayou-76235.herokuapp.com/graphql'
  : 'http://localhost:3000/graphql'

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

const getApolloClient = async () => {
  const httpLink = new HttpLink({ uri: API_HOST })
  const retryLink = new RetryLink({ attempts: { max: Infinity } })

  const authLink = setContext(({ headers }) => {
    const token = Cookies.get('token')

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const errorLink = onError(({ networkError }) => {
    if (networkError && networkError.statusCode === 401) {
      Cookies.remove('token')
      window.location.replace('/login')
    }
  })

  const queueLink = new QueueLink()

  window.addEventListener('offline', () => queueLink.close())
  window.addEventListener('online', () => queueLink.open())

  const serializingLink = new SerializingLink()

  const trackerLink = new ApolloLink((operation, forward) => {
    if (forward === undefined) return null

    const context = operation.getContext()
    const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries') || null) || []

    if (context.tracked !== undefined) {
      const { operationName, query, variables } = operation

      const newTrackedQuery = {
        query,
        context,
        variables,
        operationName,
      }

      window.localStorage.setItem('trackedQueries', JSON.stringify([...trackedQueries, newTrackedQuery]))
    }

    return forward(operation).map((data) => {
      if (context.tracked !== undefined) {
        window.localStorage.setItem('trackedQueries', JSON.stringify(trackedQueries))
      }

      return data
    })
  })

  const link = ApolloLink.from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    errorLink,
    authLink,
    httpLink
  ])

  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
  })

  const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore();
  } else {
    await persistor.purge()
    window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  const client = new ApolloClient({
    link,
    cache,
  })

  return client
}

export default getApolloClient
```

Еще у меня есть странный, который я стырил и немного передеалал. Суть в том, что можно записывать данные о мутациях в офлайне в локал сторедж, а при возвращении в онлайн доставать их оттуда, сделать на их основе новые мутации и запустить их, что по идеи должно стирать вовсе все грани между офлайн и онлайном.

Нужно написать кастомный `link`
```js
 const trackerLink = new ApolloLink((operation, forward) => {
    if (forward === undefined) return null

    const context = operation.getContext()
    const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries') || null) || []

    if (context.tracked !== undefined) {
      const { operationName, query, variables } = operation

      const newTrackedQuery = {
        query,
        context,
        variables,
        operationName,
      }

      window.localStorage.setItem('trackedQueries', JSON.stringify([...trackedQueries, newTrackedQuery]))
    }

    return forward(operation).map((data) => {
      if (context.tracked !== undefined) {
        window.localStorage.setItem('trackedQueries', JSON.stringify(trackedQueries))
      }

      return data
    })
  })

```

Поставить его в цепочке линок вот тут:
```js
  const link = ApolloLink.from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    httpLink
  ])
```

Ну а потом достать данные о мутациях при инициализации компонента например. Вот так я сделал это прям в рутовом компоненте:

```js
import React, { useEffect, useState } from 'react'

import * as updateFunctions from 'updateFunctions'
import getApolloClient from 'apolloClient'
import AppComponent from './component'

export default function App() {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(true)

  useEffect(() => {
    getApolloClient().then((client) => {
      setClient(client)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!client) return

    const execute = async () => {
      const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries') || null) || []

      const promises = trackedQueries.map(({ variables, query, context, operationName }) => client.mutate({
        context,
        variables,
        mutation: query,
        update: updateFunctions[operationName],
        optimisticResponse: context.optimisticResponse,
      }))

      await Promise.all(promises)

      window.localStorage.setItem('trackedQueries', [])
    }

    execute()
  }, [client])

  return <AppComponent client={client} loading={loading} />
}
```

## Step 3. Пуш нотификации
Последнее, что я хотел рассказать это пуш нотификации. Я решил реализовать это используя `firebase`. Тут все довольно просто.

https://firebase.google.com/docs/cloud-messaging/js/client

* Придеться сделать отдельный сервис воркер `firebase-messaging-sw.js` под файрбейс и положить его в `public`. Выглядит в итоге вот так:

```js

importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '<your sender id>'
});

const messaging = firebase.messaging();
```

* Затем нужно заинить файр бейс в `index.js`

```js
const config = {
  messagingSenderId: '<your sender id>'
}

firebase.initializeApp(config)
```

* Ну и запросить пермишены на то чтобы слать юзеру натификации в том месте, где это будет лучшевсего (не сразу когда он окроет приложение, потому что это раздражает, и он просто нажмет кенсел). Хорошим вариантом будет момент когда он сделает или увидит что либо, такое что ему реально захочется получать нотификации об этом). Ну или просто дать ему возможность включить эту опцию в настройках приложения, когда он это захочет сделать.

```js
 const messaging = firebase.messaging()

 messaging.requestPermission().then(async () => {
  const token = await messaging.getToken()
  // можно его теперь отправить на сервак
})
```

## Вывод
PWA могут быть достаточно неплохой альтернативой нативным приложением, особенно, когда нитивные возможности веб платформы и различные браузерные API могут покрыть наш функционал. Очевидное примущество что PWA это все еще то самое старое доброе веб приложение, а значит я вполне могу превратить свое клиентское приложение в мобильное не переписывая полностью клиентскую часть. И да, его можно распостранять в гугл плей и в эпп стор (если написать супер простую обертку на `react-native`, могу об этом рассказать кстати).
