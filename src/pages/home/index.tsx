import { useEffect, useState } from "react"

import { Box, Heading } from "@chakra-ui/react"
import axios from "axios"

interface DataTypes {
  type: string
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

interface Data {
  response_code: number
  results: DataTypes[]
}

const HomePage = () => {
  const [questionsList, setQuestionsList] = useState<Data>()

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        setQuestionsList(response.data as Data)
        return response.data as Data
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <Heading as='h1' fontSize='60px' w='full' textAlign='center'>
        Trivia Game
      </Heading>

      <Box>
        {questionsList?.results.map((ques) => (
          <Box key={ques.question}>{ques.correct_answer}</Box>
        ))}
      </Box>
    </>
  )
}

export default HomePage
