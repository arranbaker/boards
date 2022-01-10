const ErrorPop = ({ setError, error, errorMessage }) => {

    return (
        <div className="error-container">
            <div className="error-details-container">
                <p className="error-close" onClick={() => setError(false)}>X</p>
                <h3>Sorry there was a problem.</h3>
                <p>{error}</p>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default ErrorPop;