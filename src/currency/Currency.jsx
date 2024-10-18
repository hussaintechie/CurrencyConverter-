import { useEffect, useState } from 'react';
import axios from 'axios';

export const Currency = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertAmount, setConvertAmount] = useState(null);
    const [getExchange, setGetExchange] = useState(null);

    useEffect(() => {
        const getExchangeRate = async () => {
            try {
                const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
                const response = await axios.get(url);
                setGetExchange(response.data.rates[toCurrency]);
            } catch (error) {
                console.error("Error fetching exchange rate:", error);
            }
        };
        getExchangeRate();
    }, [fromCurrency, toCurrency]);

    const handleChangeAmount = (e) => {
        const value = parseFloat(e.target.value);
        setAmount(isNaN(value) ? 0 : value);
    };

    const handleFromChange = (e) => setFromCurrency(e.target.value);
    const handleToChange = (e) => setToCurrency(e.target.value);

    useEffect(() => {
        if (getExchange !== null) {
            setConvertAmount((amount * getExchange).toFixed(2));
        }
    }, [amount, getExchange]);

    return (
        <div className="currency-converter">
            <div className="box"></div>
            <h1>Currency Converter</h1>
            <div className="input">
                <label htmlFor="amt">Amount</label>
                <input
                    type="number"
                    id="amt"
                    value={amount}
                    onChange={handleChangeAmount}
                />
            </div>
            <div className="input">
                <label htmlFor="fromCurrency">From Currency</label>
                <select
                    id="fromCurrency"
                    value={fromCurrency}
                    onChange={handleFromChange}
                >
                    <option value="USD">USD - United States Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound Sterling</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="BRL">BRL - Brazilian Real</option>
                    <option value="ZAR">ZAR - South African Rand</option>
                </select>
            </div>
            <div className="input">
                <label htmlFor="toCurrency">To Currency</label>
                <select
                    id="toCurrency"
                    value={toCurrency}
                    onChange={handleToChange}
                >
                    <option value="USD">USD - United States Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound Sterling</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="BRL">BRL - Brazilian Real</option>
                    <option value="ZAR">ZAR - South African Rand</option>
                </select>
            </div>
            <div className="result">
                <p>
                    {amount} {fromCurrency} is equal to {convertAmount} {toCurrency}
                </p>
            </div>
        </div>
    );
};
