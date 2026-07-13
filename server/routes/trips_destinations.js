// Imp express framework
import express from 'express'
// Imp trips_dest controller
import TripsDestController from '../controllers/trips_destinations.js'

// Init express router
const router = express.Router()

// Def routes
router.get('/', TripsDestController.getTripsDestinations)
router.get('/trips/:destination_id', TripsDestController.getAllTrips)
router.get('/destinations/:trip_id', TripsDestController.getAllDestinations)
router.post('/', TripsDestController.createTripDestination)

// Exp router
export default router