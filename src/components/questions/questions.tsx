import { useState } from "react"

import {
  AlertStatus,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  type UseFormProps,
  useForm,
  SubmitHandler,
  useController,
} from "react-hook-form"
import * as Yup from "yup"

import NextNavigationButton from "components/next-button/next-navigation-button"
import { Data } from "pages/home"

import InfoMessage from "./info-message"

interface QuestionsProps {
  questionsList: Data | null
  activeStep: number
  questionNumber: number
  setCompleted: (completed: boolean) => void
  completed: boolean
  setCorrectAnswer: (correctAnswer: string[]) => void
  correctAnswer: string[]
  setWrongAnswer: (wrongAnswer: string[]) => void
  wrongAnswer: string[]
  setActiveStep: (activeStep: number) => void
}

export interface FormValues {
  answer: string
}

const schema = Yup.object().shape({
  answer: Yup.string().required("Please select any one option."),
})

const Questions = (props: QuestionsProps) => {
  const {
    questionsList,
    activeStep,
    questionNumber,
    setCompleted,
    completed,
    setCorrectAnswer,
    correctAnswer,
    setWrongAnswer,
    wrongAnswer,
    setActiveStep,
  } = props

  const [status, setStatus] = useState<AlertStatus>("success")

  const formConfig: UseFormProps<FormValues> = {
    defaultValues: {
      answer: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  }

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<FormValues>(formConfig)

  const { field: answerField, fieldState: answerFieldState } = useController({
    name: "answer",
    control,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (questionsList?.results[activeStep].correct_answer === data.answer) {
      setStatus("success")
      setCorrectAnswer([...correctAnswer, data.answer])
    } else {
      setStatus("error")
      setWrongAnswer([...wrongAnswer, data.answer])
    }

    setCompleted(true)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%" }}
        noValidate
      >
        <FormControl id='answer' mb={2}>
          <FormLabel
            as='legend'
            htmlFor='answer'
            textTransform='capitalize'
          >{`${questionNumber}) ${questionsList?.results[activeStep].question}`}</FormLabel>

          <RadioGroup
            name='answer'
            value={answerField.value}
            onChange={(value: string) => {
              answerField.onChange(value)
            }}
            isDisabled={completed}
          >
            <Stack spacing={5} direction='column'>
              <Radio value={questionsList?.results[activeStep].correct_answer}>
                {questionsList?.results[activeStep].correct_answer}
              </Radio>

              {questionsList?.results[activeStep].incorrect_answers.map(
                (option) => (
                  <Radio key={option} value={option}>
                    {option}
                  </Radio>
                ),
              )}
            </Stack>
          </RadioGroup>

          {answerFieldState.error?.message !== undefined && (
            <Text color='red' mt={2}>
              {answerFieldState.error?.message}
            </Text>
          )}
        </FormControl>

        {!completed && (
          <Box w='full' textAlign='right'>
            <Button type='submit' colorScheme='blue' isLoading={isSubmitting}>
              Submit
            </Button>
          </Box>
        )}
      </form>

      {completed && (
        <>
          <InfoMessage
            status={status}
            text={status === "success" ? "Correct Answer" : "Wrong Answer"}
            answer={questionsList?.results[activeStep].correct_answer ?? ""}
          />

          <Divider my={5} />

          <NextNavigationButton
            activeStep={activeStep}
            reset={reset}
            setCompleted={setCompleted}
            setActiveStep={setActiveStep}
          />
        </>
      )}
    </>
  )
}

export default Questions
