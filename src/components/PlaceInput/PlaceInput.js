import React from 'react';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = props => (
    <DefaultInput
        placeholder={props.placeholder}
        value={props.placeName.value}
        valid = {!props.placeName.valid}
        touched={props.placeName.touched}
        onChangeText={props.onChangeHandler}
    />
);

export default PlaceInput;