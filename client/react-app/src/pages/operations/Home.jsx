import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GenerateReportButton, RevenueReport } from './Reports.jsx';

const Home = () => {
  const [revenue, setRevenue] = useState('Loading...');
  const [ticketCount, setTicketCount] = useState('Loading...');
  const [visitorCount, setVisitorCount] = useState('Loading...');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get('/api/reports/revenue-summary');
        console.log("📊 Revenue Summary Response:", response.data);

        // Format total revenue nicely
        const formattedRevenue = `$${Number(response.data.totalRevenue).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

        setRevenue(formattedRevenue);
        setTicketCount(response.data.totalTicketsSold ?? 'N/A');
        setVisitorCount(response.data.totalVisitors ?? 'N/A');
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Error fetching revenue:", error);
        setRevenue('Error loading data');
        setTicketCount('Error');
        setVisitorCount('Error');
      }
    };

    fetchRevenue();
  }, []);

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    color: '#222',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    minHeight: '120px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  };

  const valueStyle = {
    color: '#c8102e',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
    textAlign: 'center'
  };

  const quickButtonStyle = {
    backgroundColor: 'white',
    border: 'none',
    padding: '1rem 1.5rem',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '2px 4px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease-in-out',
    textDecoration: 'none',
    color: '#000'
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ color: '#c8102e', marginBottom: '2rem', fontSize: '2.5rem' }}>
        🎡 CoogWorld Admin Overview
      </h1>

      {/* Top Cards */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={cardStyle}>
          💰 Total Revenue
          <div style={valueStyle}>{revenue}</div>
          <Link
            to="/employee-dashboard/revenue-report"
            style={{ fontSize: '0.9rem', marginTop: '0.5rem', textDecoration: 'underline', color: '#444' }}
          >
            Click to view full report
          </Link>
          {lastUpdated && (
            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.3rem' }}>
              Last updated at {lastUpdated}
            </div>
          )}
        </div>
        <div style={cardStyle}>
          🎟️ Tickets Sold Today
          <div style={valueStyle}>{ticketCount}</div>
        </div>
        <div style={cardStyle}>
          📈 Daily Visitors
          <div style={valueStyle}>{visitorCount}</div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={cardStyle}>
          🛠️ Open Maintenance Requests
          <div style={valueStyle}>7</div>
        </div>
        <div style={cardStyle}>
          🌤️ Current Weather
          <div style={valueStyle}>Sunny, 85°F</div>
        </div>
      </div>

      {/* Quick Access Section */}
      <h2 style={{ color: '#c8102e', marginBottom: '1rem' }}>Quick Access:</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/employee-dashboard/employees" style={quickButtonStyle}>Manage Employees</Link>
        <Link to="/employee-dashboard/ticket-report" style={quickButtonStyle}>Ticket Reports</Link>
        <Link to="/employee-dashboard/inventory-report" style={quickButtonStyle}>Inventory</Link>
        <Link to="/employee-dashboard/maintenance-report" style={quickButtonStyle}>Maintenance</Link>
        <Link to="/employee-dashboard/weather-report" style={quickButtonStyle}>Weather</Link>
      </div>
    </div>
  );
};

export default Home;