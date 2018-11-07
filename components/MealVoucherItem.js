import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Button
} from 'react-native';

export class MealVoucherItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }),
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
        const {
            item
        } = this.props;
        if (this.props.onDelete) {
            this.props.onDelete(item.key);
        }
    }

    renderDeleteButton() {
        if(this.props.onDelete) {
            return (<Button onPress={this.onDelete} title="delete"/>);
        }
    }

    render() {
        const { item } = this.props;
        return (
            <View>
                <Text>
                    { item.value }
                </Text>
                {this.renderDeleteButton()}
            </View>
        );
    }
}
