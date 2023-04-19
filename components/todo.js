import React, { useState } from 'react';
import { View, StyleSheet, CheckBox } from 'react-native';
import { Text, TouchableRipple } from "react-native-paper";

export default function todo({ index, todo, onSelect, navigation }) {
    // const [isSelected, setSelection] = useState(false);

    const handleSelectChange = (value) => {
        // setSelection(value);
        onSelect(index, todo, value);
    };

    return (
        <View style={styles.container}>
            <CheckBox
                value={todo.status}
                onValueChange={handleSelectChange}
                style={styles.checkbox}
            />
            <TouchableRipple onPress={() => navigation.navigate('todoDetails', { todo: todo })}>
                <View>
                    <Text style={styles.text}>{todo.title}</Text>
                </View>
            </TouchableRipple>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '10px',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 10,
    },
});