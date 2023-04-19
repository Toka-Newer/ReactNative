import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TextInput, Button, Pressable, Text } from 'react-native';
import ToDos from './todos';
import Divider from "./divider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function home(navigation) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);

    // const [selectedTodos, setSelectedTodos] = useState([]);
    const handleTodoSelect = (index, todo, isSelected) => {
        const updatedItem = [...todos];
        updatedItem[index].status = isSelected;
        setTodos(updatedItem);
        setFilteredTodos(updatedItem);
        console.log(index)
        console.log(todo)
        console.log(isSelected)
    };

    const save = () => {
        const newTodos = { title, description, status: false };
        setTodos([...todos, newTodos]);
        setTitle("");
        setDescription("");
    }

    const show = (showData) => {
        if (showData == 'all') {
            setFilteredTodos(todos);
        } else if (showData == 'active') {
            setFilteredTodos(todos.filter((todo) => todo.status === false));
        } else if (showData == 'done') {
            setFilteredTodos(todos.filter((todo) => todo.status === true));
        }
    }

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('todos');
            console.log(value)
            if (value) {
                setTodos(JSON.parse(value));
                setFilteredTodos(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos))
            setFilteredTodos(todos);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readData();
    }, [])
    useEffect(() => {
        saveData();
    }, [todos]);


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Enter the Title"
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter the Description"
                keyboardType="numeric"
            />

            <Button
                title="Save"
                onPress={save}
            />

            <Divider />
            <View style={styles.buttons}>
                {/* <Pressable style={styles.button} onPress={save}>
                    <Text style={styles.text}>All</Text>
                </Pressable> */}
                {/* <Button
                    style={styles.show}
                    title="All"
                    onPress={() => show("all")}
                /> 
                <Button
                    style={styles.show}
                    title="Active"
                    onPress={() => show("active")}
                />
                <Button
                    style={styles.show}
                    title="Done"
                    onPress={() => show("done")}
                />*/}
                <Pressable style={styles.button} onPress={() => show("all")}>
                    <Text style={styles.text}>All</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => show("active")}>
                    <Text style={styles.text}>Active</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => show("done")}>
                    <Text style={styles.text}>Done</Text>
                </Pressable>

            </View>
            <Divider />

            <View>
                <ToDos todos={filteredTodos} navigation={navigation.navigation} handleTodoSelect={handleTodoSelect}></ToDos>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '10px',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: '10px',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    show: {
        padding: '30px',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
