// Imp pool from config
import { pool } from '../config/database.js'

// Def async fn to crt trip
const createTrip = async (req, res) => {
    // Try block for err hdl
    try {
        // Ext data from req body
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body
        // Exec insert query
        const resQry = await pool.query(
            'INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, description, img_url, num_days, start_date, end_date, total_cost]
        )
        // Snd 201 status and inserted row
        res.status(201).json(resQry.rows[0])
    } catch (err) {
        // Snd 409 status and err msg
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get all trips
const getTrips = async (req, res) => {
    // Try block
    try {
        // Exec select all query
        const resQry = await pool.query('SELECT * FROM trips ORDER BY id ASC')
        // Snd 200 status and rows
        res.status(200).json(resQry.rows)
    } catch (err) {
        // Snd 409 status and err msg
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get single trip
const getTrip = async (req, res) => {
    // Try block
    try {
        // Ext id from params
        const id = parseInt(req.params.id)
        // Exec select by id query
        const resQry = await pool.query('SELECT * FROM trips WHERE id = $1', [id])
        // Snd 200 status and row
        res.status(200).json(resQry.rows[0])
    } catch (err) {
        // Snd 409 status and err msg
        res.status(409).json({ error: err.message })
        // Log err
        console.error('Error:', err.message)
    }
}

// Def async fn to upd trip
const updateTrip = async (req, res) => {
    // Try block
    try {
        // Ext data from req body
        const { title, description, img_url, num_days, start_date, end_date, total_cost } = req.body
        // Ext id from params
        const id = parseInt(req.params.id)
        // Exec upd query
        const resQry = await pool.query(
            'UPDATE trips SET title = $1, description = $2, img_url = $3, num_days = $4, start_date = $5, end_date = $6, total_cost = $7 WHERE id = $8 RETURNING *',
            [title, description, img_url, num_days, start_date, end_date, total_cost, id]
        )
        // Snd 200 status and rows
        res.status(200).json(resQry.rows[0])
    } catch (err) {
        // Snd 409 status and err msg
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to del trip
const deleteTrip = async (req, res) => {
    // Ext id from params
    const id = parseInt(req.params.id)
    // Try block
    try {
        // Exec del activities query first due to foreign key
        await pool.query('DELETE FROM activities WHERE trip_id = $1', [id])
        // Exec del trip query
        const resQry = await pool.query('DELETE FROM trips WHERE id = $1', [id])
        // Snd 200 status
        res.status(200).json(resQry.rows)
    } catch (err) {
        // Snd 409 status and err msg
        res.status(409).json({ error: err.message })
    }
}

// Exp all fns
export default {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
}