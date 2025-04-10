const db = require('../config/db.js');

exports.getRainoutsPerMonth = async () => {
  const query = `
    SELECT
      YEAR(Wtr_created) AS year,
      MONTH(Wtr_created) AS month,
      COUNT(*) AS rainouts
    FROM weather
    WHERE Wtr_level = 'Severe'
      AND Is_park_closed = 1
      AND Wtr_cond NOT IN ('Sunny', 'Foggy')
    GROUP BY YEAR(Wtr_created), MONTH(Wtr_created)
    ORDER BY year, month;
  `;

  try {
    const [rainouts] = await db.query(query);
    if (rainouts.length === 0) {
      throw new Error('No rainouts found for the given criteria');
    }
    return rainouts;
  } catch (error) {
    throw new Error('Error fetching rainouts data: ' + error.message);
  }
};

exports.getRainoutRows = async () => {
  const query = `
    SELECT
      Wtr_id,
      Wtr_created,
      Wtr_level,
      Wtr_cond,
      Is_park_closed
    FROM weather
    WHERE Wtr_level = 'Severe'
      AND Is_park_closed = 1
      AND Wtr_cond NOT IN ('Sunny', 'Foggy')
    ORDER BY Wtr_created ASC;
  `;

  try {
    const [rows] = await db.query(query);
    if (rows.length === 0) {
      throw new Error('No rainout entries found');
    }
    return rows;
  } catch (error) {
    throw new Error('Error fetching rainout rows: ' + error.message);
  }
};

/*exports.getTotalRevenue = async () => {
  // Return mock data instead of querying the database
  return {
    ticketRevenue: 12000.50,
    merchRevenue: 8700.25,
    totalRevenue: 20700.75
  };
};*/

exports.getRevenueSummary = async () => {
    const query = `
        SELECT 
        SUM(CASE WHEN product_type = 'Ticket' THEN total_amount ELSE 0 END) AS ticketRevenue,
        SUM(CASE WHEN product_type = 'Merchandise' THEN total_amount ELSE 0 END) AS merchRevenue,
        SUM(total_amount) AS totalRevenue
        FROM product_purchases;
    `;
    try {
        const [results] = await db.query(query);
        if (!results || results.length === 0) {
        throw new Error('No revenue data found');
        }
        return results;
    } catch {
        throw new Error('Error fetching revenue summary: ' + error.message);
    }
};

exports.getTopRidePerMonth = async () => {
    const query = `
      SELECT
        YEAR(ride_date) AS year,
        MONTH(ride_date) AS month,
        r.Ride_name
      FROM visitor_ride_log as v, rides as r
      WHERE v.Ride_ID = r.Ride_ID
      GROUP BY YEAR(ride_date), MONTH(ride_date)
      ORDER BY year, month;
    `;
    try {
      console.log("Executing query:", query); 
      const [rainouts] = await db.query(query);
      if (rainouts.length === 0) {
        throw new Error('No data found for the given criteria');
      }
      return rainouts;
    } catch (error) {
      console.error("Database query error:", error); 
      throw new Error('Error fetching monthly ride data: ' + error.message);
    }
};  
