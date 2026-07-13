// Imp express framework
import express from 'express'
// Imp trips controller
import TripsController from '../controllers/trips.js'

// Init express router
const router = express.Router()

// Def GET route for all trips
router.get('/', TripsController.getTrips)
// Def GET route for single trip by id
router.get('/:id', TripsController.getTrip)
// Def POST route to crt new trip
router.post('/', TripsController.createTrip)
// Def DELETE route to del trip by id
router.delete('/:id', TripsController.deleteTrip)
// Def PATCH route to upd trip by id
router.patch('/:id', TripsController.updateTrip)

// Exp router
export default router