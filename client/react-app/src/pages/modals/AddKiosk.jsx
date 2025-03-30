import { useState } from "react";

function AddKiosk({isOpen, onClose, onAddKiosk}){
    const [newKiosk, setNewKiosk] = useState({
        Kiosk_name: '',
        Kiosk_type: '',
        Kiosk_cost: '',
        Kiosk_loc: '',
        Staff_num: ''
    });

    const [message, setMessage] = useState({error: '', success: ''});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewKiosk({...newKiosk, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!newKiosk.Kiosk_name || !newKiosk.Kiosk_type || !newKiosk.Kiosk_cost || !newKiosk.Kiosk_loc || !newKiosk.Staff_num){
            setMessage({error: 'All fields required.', success: ''});
            return;
        }
        if(isNaN(newKiosk.Staff_num)){
            setMessage({error: 'Number of staff working the kiosks OR cost of the kiosk(s) MUST be numbers.', success: ''});
            return;
        }
        try {
            const response = await fetch('/api/kiosks/create-kiosk', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newKiosk),
            });
            const data = await response.json();
            console.log('Backend Response: ', data);
            if(response.ok){
                setMessage({success: 'Kisk added successfully!', error: ''});
                setNewKiosk({
                    Kiosk_name: '',
                    Kiosk_type: '',
                    Kiosk_cost: '',
                    Kiosk_loc: '',
                    Staff_num: '',
                });
                onAddKiosk(data.kiosk);
                setTimeout(() => {onClose(); window.location.href = window.location.href;});
            } else {
                setMessage({error: data.message || 'Failed to add kiosk.', success: ''});
            }
        } catch (error) {
            setMessage({error: 'An error occurred. Please try again.', success: ''});
        }
    };
    if(!isOpen) return null;
    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add New Kiosk</h2>
                <form onSubmit={handleSubmit}>
                    <div className="modal-form-grid">
                        {['Kiosk_name', 'Kiosk_cost', 'Staff_num'].map((field) => (
                            <div className="modal-input-group" key={field}>
                                <label htmlFor={field}>
                                    {field.replace(/_/g, ' ').replace(/([A_Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
                                </label>
                                <input 
                                id={field}
                                type={field === 'Staff_num' ? 'number' : 'text'}
                                name={field}
                                required
                                autoComplete="off"
                                value={newKiosk[field]}
                                onChange={handleInputChange}
                                placeholder={field.replace(/_/g, ' ').toLowerCase()} />
                            </div>
                        ))}
                        <div className="modal-input-group">
                            <label htmlFor="Kiosk_type">Type of Kiosk</label>
                            <select name="Kiosk_type" id="Kiosk_type" required value={newKiosk.Kiosk_type} onChange={handleInputChange}>
                                <option value="">Select a Type</option>
                                <option value="Food">Food</option>
                                <option value="Merch">Merchandise</option>
                                <option value="Game">Game Booth</option>
                            </select>
                        </div>
                        <div className="modal-input-group">
                            <label htmlFor="Kiosk_loc">Type of Kiosk</label>
                            <select name="Kiosk_loc" id="Kiosk_loc" required value={newKiosk.Kiosk_loc} onChange={handleInputChange}>
                                <option value="">Select a Location</option>
                                <option value='1'>Magic Coogs</option>
                                <option value='3'>Highrise Coogs</option>
                                <option value='2'>Splash Central</option>
                                <option value='4'>Lowball City</option>
                            </select>
                        </div>
                    </div>
                    {message.error && <p className="error-message">{message.error}</p>}
                    {message.success && <p className="success-message">{message.success}</p>}
                    <div className="modal-buttons">
                        <button type="submit" className="button button-block">Add Kiosk</button>
                        <button type="button" onClick={onClose} className="button button-block cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddKiosk;
