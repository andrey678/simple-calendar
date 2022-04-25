import React from 'react';

import Calendar from './Calendar';


class App extends React.Component {
  state = {
    date: null
  };

  handleDateChange = date => this.setState({date});
  
  render() {
const { date } = this.state;

    return (
      <div>
        {/* Возвращаем дату в формате принятом в текущей стране */}
        {date && <p>Выбранная дата: {date.toLocaleDateString()}</p>}
        <Calendar 
          onChange={this.handleDateChange}
        />
      </div>
    );
  }

}

export default App;
