import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

function Button () {
    const [label] = React.useState('');
    return (
        <TouchableOpacity style={styles.button}>
            <Text >{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    
});

export default Button;