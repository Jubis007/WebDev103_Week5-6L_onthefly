// Imp pool from config
import { pool } from '../config/database.js'

// Def async fn to crt dest
const createDestination = async (req, res) => {
    try {
        const { destination, description, city, country, img_url, flag_img_url } = req.body
        const resQry = await pool.query(
            'INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [destination, description, city, country, img_url, flag_img_url]
        )
        res.status(201).json(resQry.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get all dests
const getDestinations = async (req, res) => {
    try {
        const resQry = await pool.query('SELECT * FROM destinations ORDER BY id ASC')
        res.status(200).json(resQry.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to get single dest
const getDestination = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const resQry = await pool.query('SELECT * FROM destinations WHERE id = $1', [id])
        res.status(200).json(resQry.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to upd dest
const updateDestination = async (req, res) => {
    try {
        const { destination, description, city, country, img_url, flag_img_url } = req.body
        const id = parseInt(req.params.id)
        const resQry = await pool.query(
            'UPDATE destinations SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6 WHERE id = $7 RETURNING *',
            [destination, description, city, country, img_url, flag_img_url, id]
        )
        res.status(200).json(resQry.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Def async fn to del dest
const deleteDestination = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const resQry = await pool.query('DELETE FROM destinations WHERE id = $1', [id])
        res.status(200).json(resQry.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

// Exp all fns
export default {
    createDestination,
    getDestinations,
    getDestination,
    updateDestination,
    deleteDestination
}