// Imp express framework
import express from 'express'
// Imp destinations controller
import DestController from '../controllers/destinations.js'

// Init express router
const router = express.Router()

// Def routes
router.get('/', DestController.getDestinations)
router.get('/:id', DestController.getDestination)
router.post('/', DestController.createDestination)
router.delete('/:id', DestController.deleteDestination)
router.patch('/:id', DestController.updateDestination)

// Exp router
export default router