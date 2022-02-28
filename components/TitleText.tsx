import React from "react";
import {Text, StyleSheet} from 'react-native'

type TitleTextProps = {
    text: string,
    styles?: Object
}

export const TitleText = (props: TitleTextProps) => {
    return <Text style={{...styles.text, ...props.styles}}>{props.text}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans-bold',
    }
})