import React from "react";
import { Input, Button, Divider } from "@nextui-org/react";

export default function App() {
  return (
    <div className="dark w-full lg:w-2/5 h-screen bg-default-50 text-white flex items-center justify-center">
      <div className="ml-4 pt-4">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <div className="md:w-96">
          <Input type="email" label="Email" className="mb-4" />
          <Input type="password" label="Password" className="mb-4" />
          <a href="#" className="text-primary-500">
            Forgot password?
          </a>
          <Button color="primary" className="w-full mt-4 font-bold">
            Login
          </Button>
          <Divider className="my-4" />
          <p className="text-center">
            Don't have an account?{" "}
            <a href="#" className="text-primary-500">
              Register here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
