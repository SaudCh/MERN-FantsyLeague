import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";

//return icons 
//delete icon
export const DeleteIcon = () => {
    return (
        <FontAwesomeIcon icon={faTrash} className="text-danger" />
    )
}

//copy icon
export const Copy = () => {
    return (
        <FontAwesomeIcon icon={faCopy} />
    )
}