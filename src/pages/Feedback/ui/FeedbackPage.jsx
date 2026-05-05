import { useSelector, useDispatch } from "react-redux"
import { useState, useCallback } from "react"
import { editFeedback, addFeedback } from "../../../entities/User"
import  feedbackImg  from "../../../shared/assets/images/feedbackImg.png"
import { PopUp } from "../../../shared/ui/popUp/PopUp.jsx"
import "./feedbackPage.scss"

export const Feedback = () => {

    const [isPopUpOpened, setIsPopUpOpened] = useState(false)
	const [popUpMessage, setPopUpMessage] = useState("")
	const [popUpType, setPopUpType] = useState("")
	
    const handlePopUpClose = useCallback(() => {
		setIsPopUpOpened(false)
	}, [])

	const triggerPopUpSuccess = (message = "Thank's for your feedback!") => {
		setPopUpType("success")
		setPopUpMessage(message)
		setIsPopUpOpened(true)
	}

   const  feedback  = useSelector((state) => state.user.feedback) || []
   const dispatch = useDispatch()

   const satisfactionFeedback = feedback.filter((feed) => feed.rate)
   
   const appSatisfactionRate = satisfactionFeedback?.find((el) => el.caseTitle === "appointment satisfaction")?.rate || 0

   const serviceSatisfactionRate = satisfactionFeedback?.find((el) => el.caseTitle === "service satisfaction")?.rate || 0
   
   const handleSave = (title, rate) => {
     const newFeed = {
        id: Date.now(),
        caseTitle: title,
        date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
        rate: rate,
     }
     dispatch(addFeedback(newFeed))
     triggerPopUpSuccess()
   }

   const handleEdit = (title, rate) => {
      const objToEdit = satisfactionFeedback.find((el) => el.caseTitle === title)

      if(!objToEdit) return

      const newFeed = {
        ...objToEdit,
        rate: rate
      } 
      dispatch(editFeedback(newFeed))
      triggerPopUpSuccess("The rate was successfuly changed")
   }
   return(
    <div className="feedback-container">
      <header className="feedback-header">
        <h1>Feedback</h1>
      </header>
      <div className="feedback-img-container">
         <img src={feedbackImg} alt="Us wait u make feedback" />
      </div>
      <main className="feedback-main">
        <div className="feedback-main-header">
           <h2>We value ur feedback!</h2>
           <p>Share ur feedback on our services</p>
        </div>
        <div className="feedback-main-contant">
           <div className="feedback-option">
              <h3>How satisfied are you with appointment booking process?</h3>
              <div className="feedback-rate-options">
                {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                    <button key={num} type="button" onClick={() => appSatisfactionRate === 0 ? handleSave("appointment satisfaction", num) : handleEdit("appointment satisfaction", num)} className={`option-${num} ${num === appSatisfactionRate ? "feedback-option-active" : ""}`}>{num}</button>
                ))}
              </div>
              <div className="feedback-rate-explanation">
                  <p>Absolutely not satisfied</p>
                  <p>Absolutely satisfied</p>
              </div>
           </div>
           <div className="feedback-option">
              <h3>How satisfied are you with our service?</h3>
              <div className="feedback-rate-options">
                {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                    <button key={num} type="button" onClick={() => serviceSatisfactionRate === 0 ? handleSave("service satisfaction", num) : handleEdit("service satisfaction", num)} className={`option-${num} ${num === serviceSatisfactionRate ? "feedback-option-active" : ""}`}>{num}</button>
                ))}
              </div>
              <div className="feedback-rate-explanation">
                  <p>Absolutely not satisfied</p>
                  <p>Absolutely satisfied</p>
              </div>
           </div>
        </div>
      </main>
       {isPopUpOpened && (
         <PopUp
            type={popUpType}
            message = {popUpMessage}
            onClose = {handlePopUpClose}    
         />
       )}
    </div>
   )
}