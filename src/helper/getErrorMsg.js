const getErrorMsg = (error) => {
    try {
        if (error.message === 'Network Error') {
            return 'Unable to connect to server. Please check your internet connection and try again.';
        }
        if (error.response && error.response.status === 400) {
            return error.response.data.message;
        }
        if (error.response && error.response.status === 401) {
            return 'You need to log in to perform this action.';
        }
        if (error.response && (error.response.status === 500 || error.response.status === 503)) {
            return 'An error occurred on the server. Please try again later.';
        }

        return error.response.data.message || error.response.data

    } catch (error) {
        return "An error occurred"
    }
}

export default getErrorMsg