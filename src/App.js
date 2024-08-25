import React, { useState, useEffect } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState({});

  useEffect(() => {
    document.title = 'YourRollNumber';
  }, []);

  const handleChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError(null);
  
      const response = await fetch('https://bfhl-backend-1-s8qs.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
  
      let filteredResponseData = {};
      if (selectedOptions.includes('alphabets')) {
        filteredResponseData.alphabets = result.alphabets;
      }
      if (selectedOptions.includes('numbers')) {
        filteredResponseData.numbers = result.numbers;
      }
      if (selectedOptions.includes('highest_lowercase_alphabet')) {
        filteredResponseData.highest_lowercase_alphabet = result.highest_lowercase_alphabet;
      }
  
      setFilteredResponse(filteredResponseData); // Store the filtered response in state
    } catch (err) {
      setError(err.message || 'Invalid JSON format');
    }
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };
  
  return (
    <div className="App">
      <h1>Bajaj Finserv Health Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleChange}
          placeholder="Enter JSON input"
          rows="5"
          cols="50"
        />
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
      <br />
      <select multiple={true} value={selectedOptions} onChange={handleSelectChange}>
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
      </select>
      <br />
      <div>
        <h2>Filtered Response</h2>
        {filteredResponse.alphabets && (
          <div>
            <h3>Alphabets:</h3>
            <ul>
              {filteredResponse.alphabets.map((alphabet, index) => (
                <li key={index}>{alphabet}</li>
              ))}
            </ul>
          </div>
        )}
        {filteredResponse.numbers && (
          <div>
            <h3>Numbers:</h3>
            <ul>
              {filteredResponse.numbers.map((number, index) => (
                <li key={index}>{number}</li>
              ))}
            </ul>
          </div>
        )}
        {filteredResponse.highest_lowercase_alphabet && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{filteredResponse.highest_lowercase_alphabet}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
