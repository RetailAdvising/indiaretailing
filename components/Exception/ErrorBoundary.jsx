import React from 'react'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error_message: '' }
    // this.state = {error:''}
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true, error_message: error.message }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    // console.log({ error, errorInfo })
    // return { error_message: error.message }
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          {console.log(this.state.error_message)}
          <h1 className='text-red text-[20px] font-semibold'>{this.state.error_message}</h1>
          {/* <h6>{this.state.hasError.}</h6> */}
          {/* <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button> */}
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary