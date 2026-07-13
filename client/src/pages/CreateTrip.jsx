import { useState } from 'react';
import './CreateTrip.css'

// Main component
const CreateTrip = () => {

    // State for t (trip) 
    const [t, setT] = useState({ title: "", description: "", img_url: "", num_days: 0, start_date: "", end_date: "", total_cost: 0.0 })
    
    // Handle input change
    const handleChange = (e) => {
        // Get n (name) and v (value)
        const {name, value} = e.target;
        // Set t
        setT( (prev) => {
            return {
                // Keep prev
                ...prev,
                // Update n with v
                [name]:value,
            }
        })
    }
    
    // Async create function
    const createTrip = async (e) => {
        // Stop reload
        e.preventDefault();

        // Check for empty dates
        if (!t.start_date || !t.end_date) {
            // Alert user
            alert("Please select both a start and end date!");
            // Stop execution
            return;
        }

        // Set o (options)
        const o = {
            // Post method
            method: 'POST',
            // Set headers
            headers: {
                // JSON type
                'Content-Type': 'application/json'
            },
            // Stringify t
            body: JSON.stringify(t)
        }

        // Try block for error handling
        try {
            // Await fetch to finish and store in r (response)
            const r = await fetch('/api/trips', o);
            
            // Check if r is successful
            if (r.ok) {
                // Go home
                window.location.href = '/';
            } else {
                // Alert user to failure
                alert("Failed to add trip. Check the browser console!");
                // Parse error json
                const err = await r.json();
                // Log err
                console.log(err);
            }
        } catch (err) {
            // Log catch err
            console.log(err);
        }
    }

    return (
        // Outer div
        <div>
            <center><h3> Create New Trip</h3></center>
            {/* Form */}
            <form>
                <label>Title</label> <br />
                <input type="text" id="title" name="title" value={t.title} onChange={handleChange}/><br />
                <br/>

                <label>Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={t.description} onChange={handleChange}>
                </textarea>
                <br/>

                <label>Image URL </label><br />
                <input type="text" id="img_url" name="img_url" value={t.img_url} onChange={handleChange}/><br />
                <br/>

                <label>Number of Days</label><br />
                <input type="number" id="num_days" name="num_days" value={t.num_days} onChange={handleChange}/><br />
                <br/>

                {/* UPDATED: Changed from text to date */}
                <label>Start Date </label><br />
                <input type="date" id="start_date" name="start_date" value={t.start_date} onChange={handleChange}/><br />
                <br/>

                {/* UPDATED: Changed from text to date */}
                <label>End Date </label><br />
                <input type="date" id="end_date" name="end_date" value={t.end_date} onChange={handleChange}/><br />
                <br/>

                {/* UPDATED: Changed to number type for consistency */}
                <label>Total Cost</label><br />
                <input type="number" id="total_cost" name="total_cost" value={t.total_cost} onChange={handleChange}/><br />
                <br/>

                {/* Submit btn */}
                <input type="submit" value="Submit" onClick={createTrip} />
            </form>
        </div>
    )
}

// Export component
export default CreateTrip;