import React, { useEffect, useState } from "react"

import ThoughtForm from "components/ThoughtForm"
import ThoughtItem from "components/ThoughtItem"
import Loader from "components/Loader"

import { API_URL, LIKES_URL } from "utils/urls"
import Footer from "components/Footer"

export const App = () => {
  const [thoughts, setThoughts] = useState([])

  // to keep track of the new thoughts beeing typed in the input field
  const [newThought, setNewThought] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchThoughts()
  }, [])

  const fetchThoughts = () => {
    setLoading(true)
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .finally(() => setLoading(false))
  }

  // Posting a new happy thought
  const handleFormSubmit = (event) => {
    event.preventDefault()

    // Send a POST request with a JSON body
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newThought }),
    }

    // Fetches the data and pushes it into the array
    fetch(API_URL, options)
      .then((res) => res.json())
      .then((data) => {
        //v1
        // setThoughts([data, ...thoughts])

        //v2
        fetchThoughts()
      })
    setNewThought("") //clears form after first type
  }

  // Adds +1 to the like by pressing the heart
  const handleLikeIncrease = (thoughtId) => {
    const options = {
      method: "POST",
    }

    fetch(LIKES_URL(thoughtId), options)
      .then((res) => res.json())
      .then((data) => {
        fetchThoughts()
      })
  }

  return (
    <div>
      {loading && <Loader />}
      <ThoughtForm
        onFormSubmit={handleFormSubmit}
        newThought={newThought}
        setNewThought={setNewThought}
      />

      {thoughts.map((thought) => (
        <ThoughtItem
          key={thought._id}
          thought={thought}
          onLikeIncrease={handleLikeIncrease}
        />
      ))}
      <Footer />
    </div>
  )
}
