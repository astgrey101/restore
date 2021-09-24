import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundary extends Component<{ children: any }, { hasError: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError.hasError) {
      return <ErrorIndicator />;
    }

    return children.props.children;
  }
}
