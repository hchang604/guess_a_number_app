import React from "react";
import {Text, StyleSheet} from 'react-native'

type BodyTextProps = {
    text: string,
    styles?: Object
}

export const BodyText = (props: BodyTextProps) => {
    return <Text style={{...styles.text, ...props.styles}}>{props.text}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
})