'use strict'

import Hapi from 'hapi'
//import Db from './src/api/conf/db'
import routes from './api/routes/routes'
import swaggered from 'hapi-swaggered'
import swaggeredUI from 'hapi-swaggered-ui'
import vision from 'vision'
import inert from 'inert'

require('dotenv').config()

//if (!process.env.TB_VERIFY && !process.env.FB_TOKEN) {
//  throw 'Make sure you defined FB_TOKEN and FB_VERIFY in your .env file'
//}

const server = new Hapi.Server();
server.connection({ port: 4002, host: 'localhost', routes: { cors: true }, labels: ['api'] })

server.register([
    vision,
    inert,
    {
        register: swaggered,
        options: {
            info: {
                title: 'MessageService API',
                description: 'API documentation for MessageService API',
                version: '1.0'
            }
        }
    },
    {
        register: swaggeredUI,
        options: {
            title: 'MessageService API',
            path: '/docs',
            swaggerOptions: {}
        }
    }
], {
    select: 'api'
}, (err) => { if (err) { throw err } })

routes(server)

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
})