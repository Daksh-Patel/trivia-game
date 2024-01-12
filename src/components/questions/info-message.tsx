import { Alert, AlertIcon, AlertStatus } from "@chakra-ui/react"

interface InfoMessageProps {
  status: AlertStatus
  text: string
}

const InfoMessage = (props: InfoMessageProps) => {
  const { status, text } = props

  return (
    <Alert status={status} mt={2}>
      <AlertIcon />
      {text}
    </Alert>
  )
}

export default InfoMessage
