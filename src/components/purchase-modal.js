import React from "react"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Flex,
  Image,
  Heading,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react"
import { ShoppingCart } from "react-feather"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

import handleSubmit from "../utils/submit-form"

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().max(250, "Too long!"),
})

export default function PurchaseModal({ launch, price }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        mt={5}
        leftIcon={<ShoppingCart />}
        ref={finalRef}
      >
        Buy ticket
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <Flex
            bgImage={`url(${launch.links.flickr_images[0]})`}
            bgPos="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            minHeight="30vh"
            position="relative"
            p={[2, 6]}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Image
              position="absolute"
              top="5"
              right="5"
              src={launch.links.mission_patch_small}
              height={["85px", "150px"]}
              objectFit="contain"
              objectPosition="bottom"
            />
            <Heading
              color="white"
              display="inline"
              backgroundColor="#718096b8"
              fontSize={["lg", "5xl"]}
              px="4"
              py="2"
              borderRadius="lg"
            >
              {launch.mission_name}
            </Heading>
          </Flex>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "@",
              message: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={async (values) => {
              const success = await handleSubmit(values, launch, price)
              if (success) {
                onClose()
                toast({
                  title: "Ticket purchased!",
                  description: "You've just bougt yourself a ticket to space.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                })
              } else {
                toast({
                  title: "Oh no!",
                  description: "Something went wrong. Try it again.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                })
              }
            }}
          >
            {(props) => (
              <Form>
                <ModalHeader>Buy Launch Ticket</ModalHeader>
                <ModalCloseButton />
                <Box
                  pl="24px"
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                  {launch.rocket.rocket_name} &bull;{" "}
                  {launch.launch_site.site_name}
                </Box>
                <Box
                  mt="1"
                  pl="24px"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {launch.mission_name}
                </Box>
                <ModalBody pb={6}>
                  <Field name="firstName">
                    {({ field, form }) => (
                      <FormControl
                        mt={30}
                        isInvalid={
                          form.errors.firstName && form.touched.firstName
                        }
                      >
                        <FormLabel htmlFor="firstName">First name</FormLabel>
                        <Input
                          ref={initialRef}
                          {...field}
                          id="firstName"
                          placeholder="First name"
                        />
                        <FormErrorMessage>
                          {form.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastName">
                    {({ field, form }) => (
                      <FormControl
                        mt={30}
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                      >
                        <FormLabel htmlFor="lastName">Last name</FormLabel>
                        <Input
                          {...field}
                          id="lastName"
                          placeholder="Last name"
                        />
                        <FormErrorMessage>
                          {form.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} id="email" placeholder="Email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="message">
                    {({ field, form }) => (
                      <FormControl
                        mt={4}
                        isInvalid={form.errors.message && form.touched.message}
                      >
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <Textarea
                          {...field}
                          id="message"
                          placeholder="Write a message to Elon..."
                        />
                        <FormErrorMessage>
                          {form.errors.message}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Text
                    mt={30}
                    fontWeight="bold"
                    lineHeight="tight"
                    isTruncated
                  >
                    Total price: $ {price}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" colorScheme="blue" mr={3}>
                    Purchase
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
