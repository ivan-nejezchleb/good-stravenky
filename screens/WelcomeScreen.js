import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { translate } from '../services/translationsService';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingTop: 130,
        color: '#778491'
    },
    tagLine: {
        fontSize: 15,
        color: '#778491',
        textAlign: 'center',
        paddingHorizontal: 60,
        paddingVertical: 30
    },
    logo: {
        marginVertical: 40
    },
    buttonWrapper: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#4A9AEA',
        paddingHorizontal: 80,
        paddingVertical: 10,
        backgroundColor: '#4A9AEA'
    },
    button: {
        color: 'white',
        fontSize: 20
    }
});

export default class WelcomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{translate('welcome.header')}</Text>
                <Text style={styles.tagLine}>{translate('welcome.tagLine')}</Text>
                <View style={styles.logo}>
                    <Image source={require('./img/welcome_pic.png')} />
                </View>
                <TouchableOpacity onPress={() => navigate('Settings')} style={styles.buttonWrapper} activeOpacity={0.8}>
                    <Text style={styles.button}>
                        {translate('welcome.settingsButton')}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
