import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

interface HasErrorType {
  hasError: boolean
}

export default class ErrorBoundary extends
  Component<{ children: JSX.Element }, { hasErrorValue: HasErrorType }> {
  constructor(props: never) {
    super(props);
    this.state = {
      hasErrorValue: {
        hasError: false,
      },
    };
  }

  componentDidCatch(): void {
    this.setState({
      hasErrorValue: {
        hasError: false,
      },
    });
  }

  render(): JSX.Element {
    const { hasErrorValue } = this.state;
    const { children } = this.props;
    if (hasErrorValue.hasError) {
      return <ErrorIndicator />;
    }

    return children.props.children;
  }
}
