import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import ActivityBtn from '../components/ActivityBtn';
import './TripDetails.css';

// Main component
const TripDetails = ({ data }) => {
    // Get id
    const { id } = useParams();
    // State for t (trip)
    const [t, setT] = useState({id: 0, title: "", description: "", img_url: "", num_days: 0, start_date: "", end_date: "", total_cost: 0.0 });
    // State for acts (activities)
    const [acts, setActs] = useState([]);
    // State for dsts (destinations)
    const [dsts, setDsts] = useState([]);

    // Run on load
    useEffect(() => {
        // Filter matching item
        const res = data.filter(i => i.id === parseInt(id));
        // get sz
        const sz = res.length;
        // check sz
        if(sz > 0) {
            // set t
            setT(res[0]);
        }

        // Async fetch for acts
        const getActs = async () => {
            // fetch data
            const r = await fetch('/api/activities/' + id);
            // parse json
            const d = await r.json();
            // set state
            setActs(d);
        }

        // Async fetch for dsts
        const getDsts = async () => {
            // fetch data
            const r = await fetch('/api/trips_destinations/destinations/' + id);
            // parse json
            const d = await r.json();
            // set state
            setDsts(d);
        }

        // run getActs
        getActs();
        // run getDsts
        getDsts();
    }, [data, id]);

    // get sz for dsts
    const dSz = dsts ? dsts.length : 0;
    // get sz for acts
    const aSz = acts ? acts.length : 0;

    return (
        // Outer container
        <div className="out">
            {/* Top flex container */}
            <div className="flex-container">
                {/* Left text side */}
                <div className="left-side">
                    <h3>{t.title}</h3>
                    <p>{"Duration: " + t.num_days + " days"}</p>
                    <p>{"Depart: " + t.start_date }</p>
                    <p>{"Return: " + t.end_date}</p>
                    <p>{t.description}</p>
                </div>
                {/* Right image side */}
                <div className="right-side" style={{ backgroundImage:`url(${t.img_url})`}}>
                </div>
            </div>

            {/* Bottom flex container */}
            <div className="flex-container">
                {/* Dsts column */}
                <div className="destinations-container">
                    <h3>Destinations</h3>
                    {
                        // Check dSz
                        dSz > 0 ?
                        // Map dsts
                        dsts.map((dst, i) => 
                            // Dst card
                            <div key={i} className="destination-card">
                                <p>{dst.destination}</p>
                            </div>
                        ) : <p>No destinations yet.</p> // Fallback
                    }
                    <br/>
                    {/* CORRECTED LINK: removed the 's' from destination */}
                    <Link to={'/destination/new/' + id}><button className="addIdBtn">+ Add Destination</button></Link>
                </div>
                {/* Acts column */}
                <div className="activities-container">
                    <h3>Activities</h3>
                    {
                        // Check aSz
                        aSz > 0 ?
                        // Map acts without index i
                        acts.map((act) => 
                            // Act button
                            <ActivityBtn key={act.id} id={act.id} activity={act.activity} num_votes={act.num_votes} />
                        ) : <p>No activities yet.</p> // Fallback
                    }
                    <br/>
                    {/* Act link */}
                    <Link to={'/activity/create/' + id}><button className="addIdBtn">+ Add Activity</button></Link>
                </div>
            </div>
        </div>
    )
}

// Export component
export default TripDetails;