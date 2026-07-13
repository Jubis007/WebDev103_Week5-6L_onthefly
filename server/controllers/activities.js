// Imp pool from config
import { pool } from '../config/database.js'

// Def async fn to crt activity
const createActivity = async (req, res) => {
    try {
        const trip_id = parseInt(req.params.trip_id)
        const { activity } = req.body
        const resQry = await pool.query(
            'INSERT INTO activities (trip_id, activity) VALUES ($1, $2) RETURNING *',
            [trip_id, activity]
        )
        res.status(201).json(resQry.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get all activities
const getActivities = async (req, res) => {
    try {
        const resQry = await pool.query('SELECT * FROM activities ORDER BY id ASC')
        res.status(200).json(resQry.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get activities by trip_id
const getTripActivities = async (req, res) => {
    try {
        const trip_id = parseInt(req.params.trip_id)
        const resQry = await pool.query('SELECT * FROM activities WHERE trip_id = $1 ORDER BY id ASC', [trip_id])
        res.status(200).json(resQry.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to upd activity likes (increment by 1)
const updateActivityLikes = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const resQry = await pool.query(
            'UPDATE activities SET num_votes = num_votes + 1 WHERE id = $1 RETURNING *',
            [id]
        )
        res.status(200).json(resQry.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to del activity
const deleteActivity = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const resQry = await pool.query('DELETE FROM activities WHERE id = $1', [id])
        res.status(200).json(resQry.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Exp all fns
export default {
    createActivity,
    getActivities,
    getTripActivities,
    updateActivityLikes,
    deleteActivity
}