import { useContext } from "react";
import { ErrorContext } from "../context/ErrorContext";


const ErrorModal = ({ error }) => {
    const { clearError } = useContext(ErrorContext);

    return (
        <div className="error-modal">
            <span class="material-symbols-outlined" onClick={clearError}>cancel</span>
            <div className="error-modal-content">
                <p>{error}</p>
            </div>
        </div>
    )
};

export default ErrorModal;