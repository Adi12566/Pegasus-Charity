import React, { Component } from 'react';
import '../UserAdPage/style.css';

class CurrencyToEthConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyInput: '',
      ethOutput: '',
      selectedCurrency: 'INR', // Default currency
    };
  }

  // Handle currency input change
  handleCurrencyInputChange = (e) => {
    const value = e.target.value;
    this.setState({ currencyInput: value });

    // Convert currency to ETH based on the provided conversion rate
    const ethEquivalent = value * this.props.conversionRates[this.state.selectedCurrency];
    this.setState({ ethOutput: ethEquivalent.toFixed(10) }); // Limiting to 10 decimal places
  };

  // Handle currency selection change
  handleCurrencySelectionChange = (e) => {
    const selectedCurrency = e.target.value;
    this.setState({ selectedCurrency });
  };

  render() {
    const { currencyInput, ethOutput, selectedCurrency } = this.state;

    return (
      <div className='currency-converter'>
        <form className='converter-form'>
          <label className='form-label'>
            Select Currency:
            <select className='currency-select' value={selectedCurrency} onChange={this.handleCurrencySelectionChange}>
  <option value="INR">Indian Rupee (INR)</option>
  <option value="USD">United States Dollar (USD)</option>
  <option value="EUR">Euro (EUR)</option>
  <option value="GBP">British Pound Sterling (GBP)</option>
  <option value="JPY">Japanese Yen (JPY)</option>
  <option value="AUD">Australian Dollar (AUD)</option>
  <option value="CAD">Canadian Dollar (CAD)</option>
  <option value="CHF">Swiss Franc (CHF)</option>
  <option value="CNY">Chinese Yuan (CNY)</option>
  <option value="NZD">New Zealand Dollar (NZD)</option>
  {/* Add more currencies as needed */}
</select>

          </label>
          <label className='form-label'>
            Enter {selectedCurrency}:
            <input
              type="number"
              className='currency-input'
              value={currencyInput}
              onChange={this.handleCurrencyInputChange}
              placeholder={`Enter amount in ${selectedCurrency}`}
            />
          </label>
          <div className='output'>
            <strong>ETH Equivalent:</strong> {ethOutput} ETH
          </div>
        </form>
      </div>
    );
  }
}

export default CurrencyToEthConverter;
