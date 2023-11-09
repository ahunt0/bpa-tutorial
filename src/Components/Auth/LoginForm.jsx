import React from "react";
import { Input, Button, Divider } from "@nextui-org/react";
import AuthBase from "./AuthBase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginForm() {
  return (
    <AuthBase>
      <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ ease: "easeOut", duration: 0.3 }}>
        <div className="ml-4 pt-4">
          <h1 className="text-4xl font-bold mb-4">Login</h1>
          <p className="text-xl mb-8 text-default-600">
            Welcome to <span className="text-primary-500">PLACEHOLDER</span>
          </p>
          <div className="md:w-96">
            <Input type="email" label="Email" className="mb-4" />
            <Input type="password" label="Password" className="mb-4" />
            <a href="#" className="text-primary-500 hover:text-primary-600 ease-in-out duration-400">
              Forgot password?
            </a>
            <Button color="primary" variant="shadow" className="w-full mt-4 font-bold">
              Login
            </Button>
            <Divider className="my-4" />
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary-500 hover:text-primary-600 ease-in-out duration-400">
                Register here.
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </AuthBase>
  );
}
