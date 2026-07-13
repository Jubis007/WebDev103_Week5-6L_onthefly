import { useState, useEffect } from 'react';
import Card from '../components/Card';

// Main component
const ReadTrips = (props) => {

    // State for ts (trips)
    const [ts, setTs] = useState([]);
    
    // Run on load or props change
    useEffect(() => {
        // set ts to props data
        setTs(props.data);
    }, [props]);
    
    // get sz for ts
    const sz = ts ? ts.length : 0;

    return (
        // Outer container
        <div className="ReadTrips">
            {
                // Check sz
                sz > 0 ?
                // Map ts without index
                ts.map((t) => 
                   // Trip card
                   <Card key={t.id} 
                         id={t.id} 
                         title={t.title} 
                         description={t.description} 
                         img_url={t.img_url} 
                         num_days={t.num_days}
                         start_date={t.start_date}
                         end_date={t.end_date}
                         total_cost={t.total_cost} />
                ) : <h3 className="noResults">{'No Trips Yet 😞'}</h3> // Fallback
            }
        </div>  
    )
}

// Export component
export default ReadTrips;