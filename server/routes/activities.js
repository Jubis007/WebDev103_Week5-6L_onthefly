// Imp express framework
import express from 'express'
// Imp activities controller
import ActController from '../controllers/activities.js'

// Init express router
const router = express.Router()

// Def routes
router.get('/', ActController.getActivities)
router.get('/:trip_id', ActController.getTripActivities)
router.post('/:trip_id', ActController.createActivity)
router.delete('/:id', ActController.deleteActivity)
router.patch('/:id', ActController.updateActivityLikes)

// Exp router
export default router