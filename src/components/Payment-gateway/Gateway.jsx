import React, { useState } from 'react';
import './gate.css'; // Update the path based on your file structure

const Gateway = () => {
  const [creditCard, setCreditCard] = useState({
    amount: '₹.00',
    nameOnCard: 'Enter the name',
    cardNumber: '0000-0000-0000-0000',
    expirationMonth: 0,
    expirationYear: 2000,
    cvv: 'xxx',
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setCreditCard((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic goes here
    console.log('Form submitted:', creditCard);
  };

  return (
    <html>
      <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
      <head>
        <title>Payment Gateway Integration</title>
        <link rel="icon" href="images/dollar.png" type="image/png" sizes="16x16" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
        <link href='http://fonts.googleapis.com/css?family=Fugaz+One' rel='stylesheet' type='text/css' />
        <link
          href='http://fonts.googleapis.com/css?family=Alegreya+Sans:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,800,800italic,900,900italic'
          rel='stylesheet'
          type='text/css'
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery.min.js"></script>
      </head>

      <body>
        <div id="w3lDemoBar" className="w3l-demo-bar">
          {/* Include demo bar content here */}
        </div>

        <div id="horizontalTab" style={{ display: 'block', width: '100%', margin: '0px' }}>
          <div className="pay-tabs">
            <h2>Select Payment Method</h2>
            <ul className="resp-tabs-list">
              <li className="resp-tab-item" aria-controls="tab_item-0" role="tab">
                <span>Credit Card</span>
              </li>
              <li className="resp-tab-item" aria-controls="tab_item-1" role="tab">
                <span>Net Banking</span>
              </li>
              <li className="resp-tab-item" aria-controls="tab_item-2" role="tab">
                <span>PayPal</span>
              </li>
              <li className="resp-tab-item" aria-controls="tab_item-3" role="tab">
                <span>Debit Card</span>
              </li>
            </ul>
          </div>
          <div className="resp-tabs-container">
            <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-0">
              <div className="payment-info">
                <h3 className="pay-title">Credit Card Info</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="tab-for">
                    <h5>Amount</h5>
                    <input
                      className="pay-logo"
                      type="text"
                      value={creditCard.amount}
                      onChange={(e) => handleInputChange(e, 'amount')}
                      required
                    />
                  </div>
                  <div className="tab-for">
                    <h5>NAME ON CARD</h5>
                    <input
                      className="pay-logo"
                      type="text"
                      value={creditCard.nameOnCard}
                      onChange={(e) => handleInputChange(e, 'nameOnCard')}
                      required
                    />
                    <h5>CARD NUMBER</h5>
                    <input
                      className="pay-logo"
                      type="text"
                      value={creditCard.cardNumber}
                      onChange={(e) => handleInputChange(e, 'cardNumber')}
                      required
                    />
                  </div>
                  <div className="transaction">
                    <div className="tab-form-left user-form">
                      <h5>EXPIRATION</h5>
                      <ul>
                        <li>
                          <input
                            type="number"
                            className="text_box"
                            value={creditCard.expirationMonth}
                            onChange={(e) => handleInputChange(e, 'expirationMonth')}
                            min="1"
                          />
                        </li>
                        <li>
                          <input
                            type="number"
                            className="text_box"
                            value={creditCard.expirationYear}
                            onChange={(e) => handleInputChange(e, 'expirationYear')}
                            min="2000"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="tab-form-right user-form-rt">
                      <h5>CVV NUMBER</h5>
                      <input
                        type="password"
                        value={creditCard.cvv}
                        onChange={(e) => handleInputChange(e, 'cvv')}
                        required
                      />
                    </div>
                    <div className="clear"></div>
                  </div>
                  <button type="submit" className="confirm-btn">
                    SEND
                  </button>
                </form>
              </div>
            </div>

            <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-1">
              <div className="payment-info">
                <h3>Net Banking</h3>
                <div className="radio-btns">
                <div className="swit">
                    <div className="check_box">
                    <div className="radio">
                        <label>
                        <input type="radio" name="radio" checked />
                        <i></i>Andhra Bank
                        </label>
                    </div>
                    </div>
                    {/* Add similar blocks for other banks */}
                </div>
                <div className="swit">
                    <div className="check_box">
                    <div className="radio">
                        <label>
                        <input type="radio" name="radio" />
                        <i></i>Allahabad Bank
                        </label>
                    </div>
                    </div>
                    {/* Add similar blocks for other banks */}
                </div>
                {/* Add more "swit" blocks for other groups of banks */}
                <div className="clear"></div>
                </div>

                <a className="confirm-btn" href="successPage.html">
                  CONTINUE
                </a>
              </div>
            </div>

            <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-2">
            <div className="payment-info">
                <h3>PayPal</h3>
                <h4>Already Have A PayPal Account?</h4>
                <div className="login-tab">
                <div className="user-login">
                    <h2>Login</h2>
                    <form>
                    <input
                        type="text"
                        value="name@email.com"
                        onfocus="this.value = '';"
                        onblur="if (this.value == '') {this.value = 'name@email.com';}"
                        required
                    />
                    <input
                        type="password"
                        value="PASSWORD"
                        onfocus="this.value = '';"
                        onblur="if (this.value == '') {this.value = 'PASSWORD';}"
                        required
                    />
                    <div className="user-grids">
                        <div className="user-left">
                        <div className="single-bottom">
                            <ul>
                            <li>
                                <input type="checkbox" id="brand1" value="" />
                                <label htmlFor="brand1">
                                <span></span>Remember me?
                                </label>
                            </li>
                            </ul>
                        </div>
                        </div>
                        <div className="user-right">
                        <input type="submit" value="LOGIN" />
                        </div>
                        <div className="clear"></div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </div>


            <div className="tab-1 resp-tab-content" aria-labelledby="tab_item-3">
              <div className="payment-info">
                <h3 className="pay-title">Debit Card Info</h3>
                <form>
                  <div className="tab-for">
                    {/* ... (similar structure as credit card info) */}
                  </div>
                  <div className="transaction">
                    {/* ... (similar structure as credit card info) */}
                  </div>
                  <a className="confirm-btn" href="successPage.html">
                    SEND
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Gateway;
