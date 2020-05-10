import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto';

const menus = ['laughing', 'slightly-smile', 'neutral', 'frowning', 'expressionless'];

const EmotionIcon = ({selected, onSelected}) => {
    return (
        <View style={[styles.faceContainer]}>
            {menus.map((e, i) => {
                return (
                    <TouchableOpacity key={e} onPress={() => onSelected(i)}>
                        <Icon color={selected == i ? 'rgb(221,97,97)' : '#222'} name={e} size={32} />
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default EmotionIcon

const styles = StyleSheet.create({
    faceContainer: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
})
