import { Router } from '../router'

const port = process.env.PORT || 3000

console.log(`\nš  Starting HTTP server at http://localhost:${port}`)

Router.listen(port)
