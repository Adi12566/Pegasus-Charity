const ProgressBar = ({ currentValue, targetValue }) => {
    const percentage = (currentValue / targetValue) * 100;
  
    return (
      <div style={{ border: '1px solid #ddd', width: '100%', height: '20px' }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          backgroundColor: 'blue',
          textAlign: 'right',
          color: 'white',
          padding: '0 5px'
        }}>
          {percentage.toFixed(0)}%
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  