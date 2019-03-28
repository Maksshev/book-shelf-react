import React from 'react';

const FormField = (props) => {
    return (
        <div className="form_element">
            <input {...props.field} type={props.type} placeholder={props.placeholder}/>
        </div>
    );
};

export default FormField;
