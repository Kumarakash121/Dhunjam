import React, { useState, useEffect } from 'react';
import axios from 'axios';

import GraphComponent from './GraphComponent';

const Screen2 = () => {
  const [screen2Data, setScreen2Data] = useState(null);
  const [categoryValues, setCategoryValues] = useState({
    category_6: '',
    category_7: '',
    category_8: '',
    category_9: '',
    category_10: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://stg.dhunjam.in/account/admin/4');
        if (response.status === 200) {
          setScreen2Data(response.data.data);
          setCategoryValues(response.data.data.amount);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryValues({ ...categoryValues, [name]: value });
  };

  const isSaveDisabled = () => {
    const enteredValues = [
      categoryValues.category_6,
      categoryValues.category_7,
      categoryValues.category_8,
      categoryValues.category_9,
      categoryValues.category_10,
    ].map(Number);

    const minimumValues = [99, 79, 59, 39, 19];

    return enteredValues.some((value, index) => value < minimumValues[index]);
  };

  const handleUpdatePrices = async () => {
    try {
      const response = await axios.put('https://stg.dhunjam.in/account/admin/4', {
        amount: categoryValues,
      });
      if (response.status === 200) {
        setScreen2Data(response.data.data);
        setCategoryValues(response.data.data.amount);
      } else {
        throw new Error('Failed to update prices');
      }
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };
  console.log(screen2Data)
  return (
    <div className='Dash'>
      {screen2Data  && (
        <>
          <span>
            <h1>
              {screen2Data.name}, {screen2Data.location} On Dhunjam
            </h1>
          </span>
          <span style={{ padding: 20 }}>Do you want to charge your customers for requesting songs?</span>
          <label>
            <input
              type="radio"
              value="yes"
              checked={screen2Data.charge_customers === true}
              onChange={handleInputChange}
              disabled={!screen2Data.charge_customers}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={screen2Data.charge_customers === false}
              onChange={handleInputChange}
              disabled={!screen2Data.charge_customers}
            />
            No
          </label>
        </>
      )}

      {(screen2Data ) ? (
        <div>
          <span>Custom song request amount-</span>
          <input
            style={{ width: 200 }}
            className='inp'
            type="text"
            name="category_6"
            value={categoryValues.category_6}
            onChange={handleInputChange}
          />
          <br />
          <span>Regular song request amount from high to low-</span>
          <input
            style={{ width: 60 }}
            className='inp'
            type="text"
            name="category_7"
            value={categoryValues.category_7}
            onChange={handleInputChange}
          />
          <input
            style={{ width: 60 }}
            className='inp'
            type="text"
            name="category_8"
            value={categoryValues.category_8}
            onChange={handleInputChange}
          />
          <input
            style={{ width: 60 }}
            className='inp'
            type="text"
            name="category_9"
            value={categoryValues.category_9}
            onChange={handleInputChange}
          />
          <input
            style={{ width: 60 }}
            className='inp'
            type="text"
            name="category_10"
            value={categoryValues.category_10}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div>
          <span>Custom song request amount-</span>
          <input
            style={{ width: 200 }}
            className='inp'
            type="text"
            name="category_6"
            value={categoryValues.category_6}
            onChange={handleInputChange}
            disabled
          />
          <br />
          <span>Regular song request amount from high to low-</span>
          <input
            style={{ width: 60 }}
            className='inp'
            type="text"
            name="category_7"
            value={categoryValues.category_7}
            onChange={handleInputChange}
            disabled
          />
          <input
            style={{ width: 60 }}
            className='inp'
            type="text"
            name="category_8"
            value={categoryValues.category_8}
            onChange={handleInputChange}
            disabled
          />
          <input
            style={{ width: 60 }}
            className='inp'
            type="text"
            name="category_9"
            value={categoryValues.category_9}
            onChange={handleInputChange}
            disabled
          />
          <input
            style={{ width: 60 }}
            className='inp'
            type="text"
            name="category_10"
            value={categoryValues.category_10}
            onChange={handleInputChange}
            disabled
          />
        </div>
      )}

      <br />
      <br />
      {(screen2Data ) && <GraphComponent chartData={categoryValues} />}

      <button
        onClick={handleUpdatePrices}
        disabled={isSaveDisabled() && screen2Data && screen2Data.charge_customers}
        style={{ width: 300 }}
        className='btn btn-primary'
      >
        Save
      </button>
    </div>
  );
};

export default Screen2;