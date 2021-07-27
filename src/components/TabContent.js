import React from 'react';
import ChangeColorBtn from './ChangeColorBtn';

const TabContent = (props) => {
    
    const style = {
        background: props.backgroundColor,
    }
    return (
        <div className={`tab tab-content p-4`} style={style}>
            <p>Lorem ipsum {props.backgroundColor}</p>
            <ChangeColorBtn handleColorSwitch={props.onChange} color={props.backgroundColor} />
        </div>
    )
}

export default TabContent;