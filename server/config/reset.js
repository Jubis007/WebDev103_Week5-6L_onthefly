// Imp db pool
import { pool } from './database.js'
// Imp dotenv config
import './dotenv.js'
// Imp url utils
import { fileURLToPath } from 'url'
// Imp path utils
import path, { dirname } from 'path'
// Imp file system
import fs from 'fs'

// Def curr path
const currPth = fileURLToPath(import.meta.url)
// Read json file
const tripsFl = fs.readFileSync(path.join(dirname(currPth), './data/data.json'))
// Parse json data
const tripsData = JSON.parse(tripsFl)

// Def async fn to crt trips tbl
const crtTripsTbl = async () => {
    const qry = `
        DROP TABLE IF EXISTS trips CASCADE;
        CREATE TABLE IF NOT EXISTS trips (
            id serial PRIMARY KEY,
            title varchar(100) NOT NULL,
            description varchar(500) NOT NULL,
            img_url text NOT NULL,
            num_days integer NOT NULL,
            start_date date NOT NULL,
            end_date date NOT NULL,
            total_cost money NOT NULL
        );
    `
    try {
        await pool.query(qry)
        console.log('trips table created successfully')
    } catch (err) {
        console.error('error creating trips table', err)
    }
}

// Def async fn to seed trips tbl
const sdTripsTbl = async () => {
    // Await tbl creation first
    await crtTripsTbl()

    // Loop thru data
    tripsData.forEach((trip) => {
        const insQry = {
            text: 'INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }
        const vals = [
            trip.title,
            trip.description,
            trip.img_url,
            trip.num_days,
            trip.start_date,
            trip.end_date,
            trip.total_cost
        ]
        pool.query(insQry, vals, (err, res) => {
            if (err) {
                console.error('error inserting trip', err)
                return
            }
            console.log(`${trip.title} added successfully`)
        })
    })
}

// Def async fn to crt destinations tbl
const crtDestTbl = async () => {
    const qry = `
        CREATE TABLE IF NOT EXISTS destinations (
            id serial PRIMARY KEY,
            destination varchar(100) NOT NULL,
            description varchar(500) NOT NULL,
            city varchar(100) NOT NULL,
            country varchar(100) NOT NULL,
            img_url text NOT NULL,
            flag_img_url text NOT NULL
        );
    `
    try {
        await pool.query(qry)
        console.log('destinations table created successfully')
    } catch (err) {
        console.error('error creating destinations table', err)
    }
}

// Def async fn to crt activities tbl
const crtActTbl = async () => {
    const qry = `
        CREATE TABLE IF NOT EXISTS activities (
            id serial PRIMARY KEY,
            trip_id int NOT NULL,
            activity varchar(100) NOT NULL,
            num_votes integer DEFAULT 0,
            FOREIGN KEY(trip_id) REFERENCES trips(id)
        );
    `
    try {
        await pool.query(qry)
        console.log('activities table created successfully')
    } catch (err) {
        console.error('error creating activities table', err)
    }
}

// Def async fn to crt trips_destinations tbl
const crtTripsDestTbl = async () => {
    const qry = `
        CREATE TABLE IF NOT EXISTS trips_destinations (
            trip_id int NOT NULL,
            destination_id int NOT NULL,
            PRIMARY KEY (trip_id, destination_id),
            FOREIGN KEY (trip_id) REFERENCES trips (id) ON UPDATE CASCADE,
            FOREIGN KEY (destination_id) REFERENCES destinations (id) ON UPDATE CASCADE
        );
    `
    try {
        await pool.query(qry)
        console.log('trips_destinations table created successfully')
    } catch (err) {
        console.error('error creating trips_destinations table', err)
    }
}

// Def async fn to crt users tbl
const crtUsersTbl = async () => {
    const qry = `
        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            githubid integer NOT NULL,
            username varchar(100) NOT NULL,
            avatarurl varchar(500) NOT NULL,
            accesstoken varchar(500) NOT NULL
        );
    `
    try {
        await pool.query(qry)
        console.log('users table created successfully')
    } catch (err) {
        console.error('error creating users table', err)
    }
}

// Def async fn to crt trips_users tbl
const crtTripsUsersTbl = async () => {
    const qry = `
        CREATE TABLE IF NOT EXISTS trips_users (
            trip_id int NOT NULL,
            user_id int NOT NULL,
            PRIMARY KEY (trip_id, user_id),
            FOREIGN KEY (trip_id) REFERENCES trips (id) ON UPDATE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE
        );
    `
    try {
        await pool.query(qry)
        console.log('trips_users table created successfully')
    } catch (err) {
        console.error('error creating trips_users table', err)
    }
}

// Def async fn to sync table creation order
const seedDb = async () => {
    // Await base tables first (sdTripsTbl builds trips internally)
    await sdTripsTbl()
    await crtDestTbl()
    await crtUsersTbl()
    
    // Await dependent tables (foreign keys) last
    await crtActTbl()
    await crtTripsDestTbl()
    await crtTripsUsersTbl()
}

// Exec sync fn
seedDb()