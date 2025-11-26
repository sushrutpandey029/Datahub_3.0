// export defau
import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CBDataAcceptanceMemberGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.mfinindia.org/api/auth/getGraph3Data?short_name=Arohan');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const apiData = await response.json();
        console.log('API Response:', apiData); // Debug log

        // Check if graph3_data exists and is an array (based on your previous API structure)
        if (!apiData.graph3_data || !Array.isArray(apiData.graph3_data)) {
          throw new Error('Invalid data format from API - graph3_data not found');
        }

        // Transform API data to match chart format and remove decimals
        const transformedData = apiData.graph3_data.map(item => {
          // Check if the required properties exist
          if (!item.Month || item.Data_Submission_Count_Lk === undefined || item.Data_Acceptance_Percent === undefined) {
            console.warn('Invalid item structure:', item);
            return null;
          }

          return {
            month: item.Month.replace('31-', '').replace('30-', ''), // Convert to "Mar-25" format
            dataSubmissionCount: Math.round(item.Data_Submission_Count_Lk), // Remove decimals
            acceptanceRate: Math.round(item.Data_Acceptance_Percent) // Remove decimals
          };
        }).filter(item => item !== null); // Remove null items

        console.log('Transformed Data:', transformedData); // Debug log

        setData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px 12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '13px' }}>
            {payload[0].payload.month}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '2px 0', fontSize: '12px', color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'acceptanceRate' ? '%' : ' Lk'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomBarLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 8} // CHANGED: Moved from -5 to -8 (slightly more upward)
        fill="#000"
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  const renderCustomLineLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text
        x={x}
        y={y - 12} // CHANGED: Moved from -8 to -12 (slightly more upward)
        fill="#e67e22"
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
      >
        {value}%
      </text>
    );
  };

  if (loading) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#000'
          }}
        >
          Data submission count and acceptance rate - Member
        </h3>

        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333'
        }}>
          Data submission count and acceptance rate - Member
        </h3>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  // If no data after loading, show message
  if (data.length === 0) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333'
        }}>
          Data submission count and acceptance rate - Member
        </h3>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center'
      }}>
        Data submission count and acceptance rate - Member
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 13, fill: '#333' }}
            axisLine={{ stroke: '#ccc' }}
          />
          <YAxis
            yAxisId="left"
            domain={[0, 'auto']}
            tick={{ fontSize: 13, fill: '#333' }}
            axisLine={{ stroke: '#ccc' }}
            hide={true}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={['auto', 'auto']}
            tick={{ fontSize: 13, fill: '#333' }}
            axisLine={{ stroke: '#ccc' }}
            hide={true}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
          />
          <Bar
            yAxisId="left"
            dataKey="dataSubmissionCount"
            fill="#1e5a9e"
            name="Data submission count (Lk)"
            barSize={60}
            label={renderCustomBarLabel}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="acceptanceRate"
            stroke="#e67e22"
            strokeWidth={2.5}
            name="% of Data acceptance"
            dot={{ fill: '#e67e22', r: 5 }}
            activeDot={{ r: 7 }}
            label={renderCustomLineLabel}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CBDataAcceptanceMemberGraph;

