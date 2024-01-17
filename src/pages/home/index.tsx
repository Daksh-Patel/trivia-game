import { useEffect, useState } from "react"

import { Box, Divider, HStack, Heading, Text } from "@chakra-ui/react"
import axios from "axios"

import Questions from "components/questions/questions"
import Result from "components/result/result"

interface DataTypes {
  type: string
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export interface Data {
  response_code: number
  results: DataTypes[]
}

const HomePage = () => {
  const [questionsList, setQuestionsList] = useState<Data | null>(null)

  const [activeStep, setActiveStep] = useState<number>(0)
  const [completed, setCompleted] = useState<boolean>(false)

  const [correctAnswer, setCorrectAnswer] = useState<string[]>([])
  const [wrongAnswer, setWrongAnswer] = useState<string[]>([])

  const questionNumber: number = activeStep + 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10",
        )
        setQuestionsList(response.data as Data)
      } catch {
        /* error */
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [])

  return (
    <>
      <Heading as='h1' fontSize='60px' w='full' textAlign='center'>
        Trivia Game
      </Heading>

      <Box w='full' mt={5}>
        {activeStep !== 10 && (
          <>
            <HStack w='full' justifyContent='flex-end'>
              <Text>
                Question: {questionNumber}/{questionsList?.results.length}
              </Text>
            </HStack>

            <Divider mt={2} mb={5} />

            <Questions
              questionsList={questionsList}
              activeStep={activeStep}
              questionNumber={questionNumber}
              setActiveStep={setActiveStep}
              completed={completed}
              setCompleted={setCompleted}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              wrongAnswer={wrongAnswer}
              setWrongAnswer={setWrongAnswer}
            />
          </>
        )}

        {activeStep === 10 && (
          <Result
            questionsList={questionsList}
            correctAnswer={correctAnswer}
            wrongAnswer={wrongAnswer}
          />
        )}
      </Box>
    </>
  )
}

export default HomePage
