import React from "react";
import { Input, Button, Divider, Checkbox } from "@nextui-org/react";
import AuthBase from "./AuthBase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RegistrationForm() {
  return (
    <AuthBase>
      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeOut", duration: 0.3 }}>
        <div className="ml-4 pt-4">
          <h1 className="text-4xl font-bold mb-4">Register</h1>
          <p className="text-xl mb-8 text-default-600">
            Please register to access <span className="text-primary-500">PLACEHOLDER</span>
          </p>
          <div className="md:w-96">
            <div className="flex gap-4">
              <Input type="text" label="First Name" isRequired className="mb-4" />
              <Input type="text" label="Last Name" isRequired className="mb-4" />
            </div>
            <Input type="email" label="Email" isRequired className="mb-4" />
            <Input type="password" label="Password" isRequired className="mb-4" />
            <Input type="password" label="Confirm Password" isRequired className="mb-4" />
            <Checkbox color="primary" className="mb-4">
              I agree to the terms and conditions
            </Checkbox>
            <Button color="primary" variant="shadow" className="w-full font-bold">
              Register
            </Button>
            <Divider className="my-4" />
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-500">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </AuthBase>
  );
}
