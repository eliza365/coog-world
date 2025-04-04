import { useState } from "react";

function AddShow({isOpen, onClose, onAddShow}){
    const [newShow, setNewShow] = useState({
        Show_name: '',
        Stage_ID: '',
        Show_start: '',
        Show_end: '',
        Perf_num: '',
        Show_cost: '',
        Show_date: ''
    });

    const [message, setMessage] = useState({error: '', success: ''});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewShow({...newShow, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!newShow.Show_name || !newShow.Stage_ID || !newShow.Show_start || !newShow.Show_end || !newShow.Show_date || !newShow.Perf_num || !newShow.Show_cost){
            setMessage({error: 'All fields required.', success: ''});
            return;
        }
        if(isNaN(newShow.Perf_num) || isNaN(newShow.Stage_ID)){
            setMessage({error: 'Total Performers and Stage ID of the show MUST be a number.', success: ''});
            return;
        }
        try {
            const response = await fetch('/api/shows/create-show', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newShow),
            });
            const data = await response.json();
            console.log('Backend response: ', data);
            if(response.ok){
                setMessage({success: 'Show added successfully.', error: ''});
                setNewShow({
                    Show_name: '',
                    Stage_ID: '',
                    Show_start: '',
                    Show_end: '',
                    Perf_num: '',
                    Show_cost: '',
                    Show_date: '',
                });
                onAddShow(data.show);
                setTimeout(() => {onClose(); window.location.href = window.location.href;});
            } else {
                setMessage({error: data.message || 'Failed to add show.', success: ''});
            }
        } catch (error) {
            setMessage({error: 'An error occurred. Please try again.', success: ''});
        }
    };
    if(!isOpen) return null;
    const getPlaceholders = (field) => {
        const placeholders = {
            'Show_name': 'e.g. The Great Coog',
            'Show_cost': 'e.g. 500000',
            'Perf_num': 'e.g. 20',
            'Stage_ID': 'Select a stage',
            'Show_start': 'Select a start time',
            'Show_end': 'Select an end time',
            'Show_date': 'Select the date of performance'
        };
        return placeholders[field] || '';
    };
    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add New Show</h2>
                <form onSubmit={handleSubmit}>
                    {['Show_name', 'Show_start', 'Show_end', 'Perf_num', 'Show_cost', 'Show_date'].map((field) => (
                        <div className="modal-input-group" key={field}>
                            <label htmlFor={field}>
                                {field === 'Perf_num' ? 'Performers' : field.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
                            </label>
                            <input 
                            id={field}
                            type={field === 'Show_date' ? 'date' : field === 'Perf_num' ? 'number' : field === 'Show_start' ? 'time' : field === 'Show_end' ? 'time' : 'text'}
                            name={field}
                            required
                            autoComplete="off" 
                            value={newShow[field]}
                            onChange={handleInputChange}
                            placeholder={getPlaceholders(field)} />
                        </div>
                    ))}
                    <div className="modal-input-group">
                        <label htmlFor="Stage_ID">Stage</label>
                        <select
                            id="Stage_ID"
                            name="Stage_ID"
                            required
                            value={newShow.Stage_ID}
                            onChange={handleInputChange}>
                            <option value="">-- Select a Stage --</option>
                            <option value="1">Music Hall</option>
                            <option value="2">Cullen Performance Stage</option>
                            <option value="3">Plaza Outdoor Stage</option>
                            <option value="4">Leiss' Wacky Circus</option>
                            <option value="5">The Downtown Drama</option>
                            <option value="6">Crescent Moon Theatre</option>
                            <option value="7">Stage of Wonder</option>
                        </select>
                    </div>
                    {message.error && <p className="error-message">{message.error}</p>}
                    {message.success && <p className="success-message">{message.success}</p>}
                    <div className="modal-buttons">
                        <button type="submit">Add Show</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddShow;
