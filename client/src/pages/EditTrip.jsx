import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './EditTrip.css'

// Main component
const EditTrip = ({ data }) => {
    // Get id
    const { id } = useParams();
    // State for t (trip)
    const [t, setT] = useState({id: 0, title: "", description: "", img_url: "", num_days: 0, start_date: "", end_date: "", total_cost: 0.0 });

    // Run on load
    useEffect(() => {
        // Filter res
        const res = data.filter(i => i.id === parseInt(id));
        // Get sz
        const sz = res.length;
        // Check sz
        if(sz > 0) {
            // Set t
            setT(res[0]);
        }
    }, [data, id]);

    // Handle change
    const handleChange = (event) => {
        // Get n and v
        const {name, value} = event.target;
        // Set t
        setT( (prev) => {
            return {
                // Keep prev
                ...prev,
                // Set n to v
                [name]:value,
            }
        })
    }

    // Async update
    const updateTrip = async (event) => {
        // Stop reload
        event.preventDefault();
        // Set o
        const o = {
            // Patch method
            method: 'PATCH',
            // Headers
            headers: {
                'Content-Type': 'application/json'
            },
            // Stringify t
            body: JSON.stringify(t)
        }
        // Await fetch
        await fetch('/api/trips/' + id, o)
        // Go home
        window.location.href = '/'
    }

    // Async delete
    const deleteTrip = async (event) => {
        // Stop reload
        event.preventDefault();
        // Set o
        const o = {
            // Delete method
            method: 'DELETE'
        }
        // Await fetch
        await fetch('/api/trips/' + id, o)
        // Go home
        window.location.href = '/'
    }

    return (
        // Outer div
        <div>
            <center><h3>Edit Trip</h3></center>
            {/* Form */}
            <form>
                <label>Title</label> <br />
                <input type="text" id="title" name="title" value={t.title} onChange={handleChange}/><br />
                <br/>

                <label>Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={t.description} onChange={handleChange}></textarea>
                <br/>

                <label>Image URL </label><br />
                <input type="text" id="img_url" name="img_url" value={t.img_url} onChange={handleChange}/><br />
                <br/>

                <label>Number of Days</label><br />
                <input type="number" id="num_days" name="num_days" value={t.num_days} onChange={handleChange}/><br />
                <br/>

                <label>Start Date </label><br />
                <input type="text" id="start_date" name="start_date" value={t.start_date} onChange={handleChange}/><br />
                <br/>

                <label>End Date </label><br />
                <input type="text" id="end_date" name="end_date" value={t.end_date} onChange={handleChange}/><br />
                <br/>

                <label>Total Cost</label><br />
                <input type="text" id="total_cost" name="total_cost" value={t.total_cost} onChange={handleChange}/><br />
                <br/>

                {/* Submit btn */}
                <input type="submit" value="Submit" onClick={updateTrip} />
                {/* Delete btn */}
                <button className="deleteButton" onClick={deleteTrip}>Delete</button>
            </form>
        </div>
    )
}

// Export component
export default EditTrip;