import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";

export default function ForgotPassModal({ isOpen, setIsOpen }) {
  return (
    <>
      <Modal className="dark text-white" backdrop="blur" size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-xl font-bold">Forgot Your Password?</p>
                <p className="text-default-600 text-sm">Enter your email address below and we'll send you a link to reset your password.</p>
              </ModalHeader>
              <ModalBody>
                <Input autoFocus label="Email" />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={() => setIsOpen(false)}>
                  Close
                </Button>
                <Button color="secondary" onPress={() => setIsOpen(false)}>
                  Reset Password
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
