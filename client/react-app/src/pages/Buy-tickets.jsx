import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; 
import axios from 'axios';

function TicketCard({ title, price, description1, description2, ticketId }) {
    const { isAuthenticated, user } = useAuth();
    const userId = user?.id;
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const handlePurchase = async () => {
        try {
            if (!isAuthenticated || !userId || !ticketId) {
                alert('Please log in to purchase tickets.');
                navigate('/login');
                return;
            }

            const response = await axios.post('/api/ticket-type/purchase', {
                user_id: userId,
                ticket_id: ticketId,
                price: price,
                quantity: parseInt(quantity)
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Ticket Purchased Successfully!');
            } else {
                alert(`Purchase Failed: ${response.data.message}`);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                                  error.message ||
                                  'Purchase failed unexpectedly';
            alert(`Purchase Failed: ${errorMessage}`);
        }
    };

    return (
        <div className='price-card'>
            <h3>{title}</h3>
            <h2>${price}</h2>
            <ul>
                <li>{description1}</li>
                <li>{description2}</li>
            </ul>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '10px' }}>
                <label>Quantity: </label>
                <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                    {[...Array(10).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                </select>
            </div>

            <div>
                <strong>Total: ${(price * quantity).toFixed(2)}</strong>
            </div>

            <button className='fancy' onClick={handlePurchase}>Purchase</button>
        </div>
    );
}

function ParkingCard({ title, price, description1, description2 }) {
    return (
        <div className='price-card parking-card'>
            <h3>{title}</h3>
            <h2>+${price}</h2>
            <ul>
                <li>{description1}</li>
                <li>{description2}</li>
            </ul>
            <button className='fancy'>Add Parking</button>
        </div>
    );
}

function Tickets() {
    const [ticketOptions, setTicketOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const descriptions = [
        {
            description1: 'Allows access to the themepark.',
            description2: 'Date-based ticket that requires you to choose a start date.'
        },
        {
            description1: 'Includes General Admission plus VIP lounge access.',
            description2: 'Date-based ticket with priority access to rides.'
        },
        {
            description1: 'Unlimited visits for the entire season.',
            description2: 'Includes discounts on food and merchandise.'
        },
        {
            description1: 'Optional parking pass for your vehicle.',
            description2: 'Includes all day parking.'
        }
    ];

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/api/ticket-type');
                const ticketsWithDesc = response.data.map((ticket, index) => {
                    if (index < descriptions.length) {
                        return { ...ticket, ...descriptions[index] };
                    }
                    return ticket;
                });
                setTicketOptions(ticketsWithDesc);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    if (loading) return null;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <h1 id='tickets-title'>Our Pricing Plan</h1>
            <div className='price-container'>
                {ticketOptions.slice(0, 3).map((ticket) => (
                    <TicketCard
                        key={ticket.ticket_id}
                        title={ticket.ticket_type}
                        price={ticket.price}
                        description1={ticket.description1}
                        description2={ticket.description2}
                        ticketId={ticket.ticket_id}
                    />
                ))}
            </div>
            <div className='price-container'>
                {ticketOptions.length > 3 && (
                    <ParkingCard
                        title={ticketOptions[3].ticket_type}
                        price={ticketOptions[3].price}
                        description1={ticketOptions[3].description1}
                        description2={ticketOptions[3].description2}
                    />
                )}
            </div>
        </>
    );
}

export default Tickets;