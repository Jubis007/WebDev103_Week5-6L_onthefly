// Imp pool from config
import { pool } from '../config/database.js'

// Def async fn to crt trip destination relation
const createTripDestination = async (req, res) => {
    try {
        const { trip_id, destination_id } = req.body
        const resQry = await pool.query(
            'INSERT INTO trips_destinations (trip_id, destination_id) VALUES ($1, $2) RETURNING *',
            [trip_id, destination_id]
        )
        res.status(201).json(resQry.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get all relations
const getTripsDestinations = async (req, res) => {
    try {
        const resQry = await pool.query('SELECT * FROM trips_destinations ORDER BY trip_id ASC')
        res.status(200).json(resQry.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get all trips for a specific destination
const getAllTrips = async (req, res) => {
    try {
        const destination_id = parseInt(req.params.destination_id)
        // Use JOIN to get trip details linked to destination
        const resQry = await pool.query(
            'SELECT t.* FROM trips t JOIN trips_destinations td ON t.id = td.trip_id WHERE td.destination_id = $1',
            [destination_id]
        )
        res.status(200).json(resQry.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get all destinations for a specific trip
const getAllDestinations = async (req, res) => {
    try {
        const trip_id = parseInt(req.params.trip_id)
        // Use JOIN to get dest details linked to trip
        const resQry = await pool.query(
            'SELECT d.* FROM destinations d JOIN trips_destinations td ON d.id = td.destination_id WHERE td.trip_id = $1',
            [trip_id]
        )
        res.status(200).json(resQry.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Exp all fns
export default {
    createTripDestination,
    getTripsDestinations,
    getAllTrips,
    getAllDestinations
}