import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertStatus,
  AlertTitle,
  Box,
} from "@chakra-ui/react"

interface InfoMessageProps {
  status: AlertStatus
  text: string
  answer: string
}

const InfoMessage = (props: InfoMessageProps) => {
  const { status, text, answer } = props

  return (
    <Alert status={status} mt={2} alignItems='flex-start'>
      <AlertIcon />
      <Box>
        <AlertTitle fontWeight='normal'>{text}</AlertTitle>
        {status === "error" && (
          <AlertDescription fontSize='large'>
            Right answer: {answer}
          </AlertDescription>
        )}
      </Box>
    </Alert>
  )
}

export default InfoMessage
