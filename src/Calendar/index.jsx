import React from 'react';
import classnames from 'classnames';

import * as calendar from './calendar';

import './index.css';

class Calendar extends React.Component{
    static defaultProps = {
        date: new Date(),
        years: [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030],
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        weekDayNames: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        onChange: Function.prototype
    };
    // Состояние для хранения выбора месяца и года, текущей даты и выбранной даты
    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null
    };

    get year(){
        return this.state.date.getFullYear();
    }
    get month(){
        return this.state.date.getMonth();
    }
    get day(){
        return this.state.date.getDate();
    }
    // Обработчик кнопки назад для месяца
    handlePrevMonthButtonClick = () => {
        const date = new Date(this.year,this.month - 1);

        this.setState({date});
    };
    // Обработчик кнопки вперёд для месяца
    handleNextMonthButtonClick = () => {
        const date = new Date(this.year,this.month + 1);

        this.setState({date});
    };
    // Метод для обработки календаря
    handleSelectChange = () => {
        // Значение года из селекта года
        const year = this.yearSelect.value;
        // Значение месяца из селекта месяца
        const month = this.monthSelect.value;
        // Создаём новую дату
        const date = new Date(year, month);
        // Обновляем состояние
        this.setState({date});
    };
    // Обработчие при нажатии на день в календаре
    handleDayClick = date => {
        this.setState({selectedDate: date});
        // Сообщаем родительскому компоненту, что была выбрана новая дата
        this.props.onChange(date);
    };
    render(){
        const { years, monthNames, weekDayNames } = this.props;

        const { currentDate, selectedDate } = this.state;
        // получаем данные с помощью внешнего модуля calendar
        const monthData = calendar.getMonthData(this.year, this.month);
        return (
            <div className="calendar">
                {/* Элементы управления */}
                <header>
                    <button onClick={this.handlePrevMonthButtonClick}>{'<'}</button>
                    <select
                        ref={element => this.monthSelect = element}
                        value={this.month}
                        onChange={this.handleSelectChange}
                    >
                        {monthNames.map((name, index) => 
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>
                    <select 
                        ref={element => this.monthSelect = element}
                        value={this.year}    
                        onChange={this.handleSelectChange}
                    >
                        {years.map(year => 
                            <option key={year} value={year}>{year}</option>    
                        )}
                    </select>
                    <button onClick={this.handleNextMonthButtonClick}>{'>'}</button>
                </header>
                {/* Календарь */}
                <table>
                    {/* Дни недели */}
                    <thead>
                        <tr>
                            {weekDayNames.map(name => 
                                <th name={name}>{name}</th>    
                            )}
                        </tr>
                    </thead>
                    {/* Ряды из дней по неделям */}
                    <tbody>
                        {monthData.map((week, index) =>
                            <tr key={index} className="week">
                                {week.map((date, index) => date ?
                                    <td 
                                        key={index} 
                                        className={classnames('day',{
                                            'today': calendar.areEqual(date, currentDate),
                                            'selected': calendar.areEqual(date, selectedDate)
                                        })}
                                        onClick={() => this.handleDayClick(date)}
                                        >{date.getDate()}</td>
                                    :
                                    <td key={index} />
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;