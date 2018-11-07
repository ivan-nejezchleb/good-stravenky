import React from 'react';
import {
    Text
} from 'react-native';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorDetails: null
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            errorDetails: {
                ...error,
                ...info
            }
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Text> Something went wrong. {this.state.errorDetails}</Text>;
        }
        return this.props.children;
    }
}
