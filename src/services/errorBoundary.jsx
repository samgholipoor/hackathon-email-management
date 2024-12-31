import { Component, ReactNode } from "react";
// import * as Sentry from '@sentry/browser';
import ErrorBoundaryFallback from "@/components/ErrorBoundaryFallback.jsx";
// import { IS_PROD } from '@/constants';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasError: false,
      callback: () => {},
      message: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.eventId = null;
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });

    // if (IS_PROD) {
    // 	Sentry.withScope((scope) => {
    // 		scope.setExtras(errorInfo);
    // 		Sentry.captureException(error);
    // 	});
    // }

    if (error.message) {
      this.setState({ message: error.message });
    }

    if (error.callback) {
      this.setState({ callback: error.callback });
    }

    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  async handleClick() {
    this.setState({ loading: true, hasError: false });

    try {
      await this.state.callback();
      this.setState({ callback: () => {} });
    } catch (error) {
      this.setState({ hasError: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleRemoveUIFallback() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-screen">
          <ErrorBoundaryFallback
            callback={this.handleClick}
            loading={this.state.loading}
            message={this.state.message}
            removeUIFallback={this.handleRemoveUIFallback}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
