"use client"
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signIn } from 'next-auth/react';

function GoogleLogin() {
 

  return (
    <div>
      <div className="flex items-center justify-center gap-5 text-center">
        <motion.p
          whileHover={{ scale: 1.1 }}
          className="flex items-center w-64 h-10 bg-slate-100 justify-center rounded text-headingColor dark:text-gray-900 px-5 cursor-pointer shadow-sm hover:bg-slate-100"
          onClick={() => signIn('google')}        >
          <FcGoogle className="text-xl w-5 ml-1" />
          <span>ورود از طریق حساب گوگل</span>
        </motion.p>
      </div>
    </div>
  );
}

export default GoogleLogin;
