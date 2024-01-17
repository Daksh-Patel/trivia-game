import { Box, Heading, List, ListItem } from "@chakra-ui/react"

import { Data } from "pages/home"

interface ResultProps {
  questionsList: Data | null
  correctAnswer: string[]
  wrongAnswer: string[]
}

const Result = (props: ResultProps) => {
  const { questionsList, wrongAnswer, correctAnswer } = props

  return (
    <Box w='full' mt={4}>
      <Heading as='h2' mb={2}>
        Result
      </Heading>

      <List>
        <ListItem>Total Questions: {questionsList?.results.length}</ListItem>
        <ListItem>Correct Answer: {correctAnswer.length}</ListItem>
        <ListItem>Incorrect Answer: {wrongAnswer.length}</ListItem>
      </List>
    </Box>
  )
}

export default Result
