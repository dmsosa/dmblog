function ErrorMessages({errorList}:{errorList: string[]} ) {
    return errorList.length > 0 ? 
    (
        errorList.map((errorMsg) => {
            return <p className="error-message">{errorMsg}</p>
        })
    ) 
    : 
    <></>
}

export default ErrorMessages;