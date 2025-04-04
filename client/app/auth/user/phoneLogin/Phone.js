"use client";
import { useEffect } from "react";

function Phone({handleSubmit,signin,register}) {


  return (

    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit((data) => signin({ phone: data.phone }))}>
      <input
        type="tel"
        placeholder="شماره تلفن"
        id="phone"
        name="phone"
        className="border p-2 rounded"
        {...register("phone", { required: true })}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ارسال کد
      </button>
    </form>
  );
}

export default Phone;
