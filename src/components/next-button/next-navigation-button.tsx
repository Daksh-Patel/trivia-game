import { Box, Button } from "@chakra-ui/react"
import { UseFormReset } from "react-hook-form"

import { FormValues } from "components/questions/questions"

interface NextNavigationButtonProps {
  activeStep: number
  reset: UseFormReset<FormValues>
  setCompleted: (completed: boolean) => void
  setActiveStep: (activeStep: number) => void
}

const NextNavigationButton = (props: NextNavigationButtonProps) => {
  const { activeStep, reset, setActiveStep, setCompleted } = props

  const handleGoToNextStep = () => {
    setActiveStep(activeStep + 1)
    setCompleted(false)
    reset()
  }

  return (
    <Box w='full' textAlign='right'>
      <Button
        onClick={handleGoToNextStep}
        variant='outline'
        ml='auto'
        colorScheme='black'
      >
        Next
      </Button>
    </Box>
  )
}

export default NextNavigationButton
