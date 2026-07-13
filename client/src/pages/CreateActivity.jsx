import { useState } from 'react';
import { useParams } from 'react-router';
import './CreateActivity.css';

const CreateActivity = () => {
    const { trip_id } = useParams();
    const [activity, setActivity] = useState({activity: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setActivity( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createActivity = async (event) => {
        event.preventDefault();
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activity)
        }
        
        await fetch('/api/activities/' + trip_id, options);
        window.location.href = '/';
    }

    return (
        <div>
            <center><h3>Add Activity</h3></center>
            <form>
                <label>Activity</label> <br />
                <input type="text" id="activity" name="activity" value={activity.activity} onChange={handleChange}/><br />
                <br/>
                <input type="submit" value="Submit" onClick={createActivity} />
            </form>
        </div>
    )
}

export default CreateActivity;