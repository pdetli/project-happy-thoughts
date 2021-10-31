import React from "react"
import moment from "moment"

const ThoughtItem = ({ thought, onLikeIncrease }) => {
  return (
    <>
      <div className="thought-container">
        <p>{thought.message}</p>
        <div className="bottom-info">
          <div className="hearts-counter">
            <button
              className="hearts"
              onClick={() => onLikeIncrease(thought._id)}
            >
              {" "}
              <span role="img" aria-label="heart image">
                {" "}
                ❤️{" "}
              </span>
            </button>
            <span className="x-hearts"> x {thought.hearts}</span>
          </div>
          <p className="date">{moment(thought.createdAt).fromNow()}</p>
        </div>
      </div>
    </>
  )
}

export default ThoughtItem
