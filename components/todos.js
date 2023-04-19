import React from 'react';
import { View, StyleSheet } from 'react-native';
import Todo from './todo';

export default function todos({ todos, handleTodoSelect, navigation }) {
    return (
        <View>
            {todos.map((todo, index) => (
                <Todo todo={todo} key={index} index={index} navigation={navigation} onSelect={handleTodoSelect} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '10px',
    }
});