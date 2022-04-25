import React from 'react';

import './index.css';

class Calendar extends React.Component{
    static defaultProps = {
        years: [2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030],
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        weekDayNames: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
    };
    render(){
        const { years, monthNames, weekDayNames } = this.props;
        return (
            <div className="calendar">
                {/* Элементы управления */}
                <header>
                    <button>{'<'}</button>
                    <select>
                        {monthNames.map((name, index) => 
                            <option key={name} value={index}>{name}</option>
                        )}
                    </select>
                    <select>
                        {years.map(year => 
                            <option key={year} value={year}>{year}</option>    
                        )}
                    </select>
                    <button>{'>'}</button>
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

                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;