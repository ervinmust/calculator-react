import React from 'react';

const HistoryItem = ({transaction}) => {

    const {description, amount, add} = transaction;
    
    return (
        <>
            <li className={`history__item ${add ? 'history__item-plus' : 'history__item-minus'}`}>{description}
                <span className="history__money">{`${add ? '+' : '-'}`}{amount} ₽</span>
                <button className="history__delete">x</button>
            </li>
        </>
    );
}

export default HistoryItem;