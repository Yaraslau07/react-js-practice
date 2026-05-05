import { useEffect } from "react"
import "./popUp.scss"

export function PopUp({ type, message, onClose }){

   useEffect(() => {
     const timer = setTimeout(() => {
        onClose()
     }, 4000);

     return () => {
        clearTimeout(timer)
     } 
   }, [onClose])

   return(
    <div className="popup-container">
      <div className={`popup popup--${type}`}>
        <button type="button" className="popup--close" onClick={onClose}>
          &times;
        </button>
        <div className="popup--icon">
          {type === 'success' ? (
            "ᕙ( •̀ ᗜ •́ )ᕗ"
          ) : (
             `¯\\_(ツ)_/¯`
          )}
        </div>
        <div className="popup--content">
          <p className="popup--message">{message}</p>
        </div>
        </div>
    </div>
  )
}
