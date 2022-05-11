import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";

export const DeleteIcon = () => {
    return (
        <FontAwesomeIcon icon={faTrash} className="text-danger" />
    )
}
export const Copy = () => {
    return (
        <FontAwesomeIcon icon={faCopy} />
    )
}