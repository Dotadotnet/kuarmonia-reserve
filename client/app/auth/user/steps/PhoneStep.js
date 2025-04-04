// components/signup/steps/PhoneStep.jsx
import React from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import axios from "axios";
import next from "next";
import toast from "react-hot-toast";

const PhoneStep = ({ register, errors, getValues, setValue, setError, prevStep, nextStep, clearErrors }) => {
  const chackValid = () => {

    let input = event.target;
    if (input.value.length > 11) {
      input.value = input.value.slice(0, 11)
    } else {
      setValue('phone', input.value)
    }
  }
  const nextCustomStrp = (phone) => {
    if (getValues('phone').length == 11) {
      if (getValues('phone').slice(0, 2) == '09') {
        axios.post('/api/auth/send-verify', {
          phone: getValues('phone'),
        })
          .then(function (response) {
            if (!response.data.success) {
              toast.error(response.data.message);
              setError("phone", { type: "custom", message: response.data.message })
            } else {
              toast.success(response.data.message,{ duration: 8000 });
              clearErrors("phone")
              nextStep()
            }
          })
          .catch(function (error) {
          });
      } else {
        setError("phone", { type: "custom", message: "شماره باید با 09 شروع شود" })
      }





    }
  }
  return (
    <>
      <label htmlFor="phone" className="flex mt-4 flex-col gap-y-1">
        <span className="text-sm">شماره تلفن خود را وارد کنید</span>
        <div className="relative py-2 w-full">
          <input
            type="number"
            name="phone"
            id="phone"
            {...register("phone", {
              required: "وارد کردن شماره تلفن الزامی است",
              pattern: {
                value: /^((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}$/,
                message: "شماره تلفن صحیح نیست",
              },
            })}
            onChange={chackValid}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                setTimeout(() => {
                  nextCustomStrp()
                }, 100)
              }
            }}
            placeholder="... 0912"

            className="sm:p-3 sm:px-4  px-3 p-2 tracking-widest w-full hide-arrow sm:text-xl text-lg text-left  rounded  border "
          />
        </div>
        {errors.phone && (
          <span className="text-red-500 mr-5 text-sm">
            {errors.phone.message}
          </span>
        )}
      </label>
     
    </>
  );
};

export default PhoneStep;
