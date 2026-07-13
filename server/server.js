// Imp express framework
import express from 'express'
// Imp cors for cross origin reqs
import cors from 'cors'
// Imp trip routes
import tripRoutes from './routes/trips.js'
import destRoutes from './routes/destinations.js'
import actRoutes from './routes/activities.js'
import tripsDestRoutes from './routes/trips_destinations.js'

// Init express app instance
const app = express()


// Add middleware to parse JSON
app.use(express.json())
// Add middleware to enable CORS
app.use(cors())

// Def GET route for root url
app.get('/', (req, res) => {
    // Snd 200 status and HTML title
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;"> On the Fly API </h1>')
})

// Add middleware for trips routes
app.use('/api/trips', tripRoutes)
app.use('/api/destinations', destRoutes)
app.use('/api/activities', actRoutes)
app.use('/api/trips_destinations', tripsDestRoutes)
// Def port from env or default to 3001
const prt = process.env.PORT || 3001


// Start server listening on port
app.listen(prt, () => {
    // Log success msg to console
    console.log(`Server running on http://localhost:${prt}`)
})