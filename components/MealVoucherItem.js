import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export class MealVoucherItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }).isRequired,
        onDelete: PropTypes.func
    };

    static defaultProps = {
        onDelete: undefined
    };

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        const { item } = this.props;
        if (this.props.onDelete) {
            this.props.onDelete(item.key);
        }
    }

    renderDeleteButton() {
        if (this.props.onDelete) {
            return (
                <TouchableOpacity
                    onPress={this.onDelete}
                    style={styles.deleteButtonWrapper}
                    activeOpacity={0.8}
                >
                    <Image source={require('../screens/img/delete.png')} />
                </TouchableOpacity>
            );
        }
        return null;
    }

    render() {
        const { item } = this.props;
        return (
            <View style={styles.item}>
                <Text style={styles.value}>
                    {item.value}
                </Text>
                {this.renderDeleteButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 50,
        textAlign: 'right',
        borderBottomWidth: 2,
        borderBottomColor: '#c9d5e0'
    },
    value: {
        height: 50,
        textAlign: 'right',
        fontSize: 40,
        color: '#94a1ad',
        marginRight: 10
    },
    deleteButtonWrapper: {
        paddingBottom: 10,
        paddingVertical: 10
    }
});
