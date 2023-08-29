import "./EmptyCard.css"

import { AiFillWarning } from "react-icons/ai";

export const EmptyCard = ({text}) => {
  return <div className="empty-container">
    <div className="empty-card">
      <AiFillWarning className="warning-icon"/>
      <div>Your {text} Is Empty</div>
    </div>
  </div>
}