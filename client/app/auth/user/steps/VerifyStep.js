// components/signup/steps/PhoneStep.jsx
import React, { useEffect } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import axios from "axios";
import Timer from "./timer";
import toast from "react-hot-toast";
const VerifyStep = ({ register, errors , getValues , prevStep , nextStep , clearErrors , setError }) => {
  const phone = getValues('phone');
  useEffect(() => {
    axios.post('/api/auth/timer', {
        phone: phone,
      })
        .then(function (response) {
          if (response.data.success) {

            var timeLimitInSeconds = parseInt(response.data.message);
            var timerElement = document.getElementById('timerrrrrrrrrrrrrrrrrrrrrrr');
            var currentText = document.getElementById('currentTextTimer');
            function startTimer() {
                timeLimitInSeconds--;
                var minutes = Math.floor(timeLimitInSeconds / 60);
                var seconds = timeLimitInSeconds % 60;
        
                if (timeLimitInSeconds < 0) {
                    timerElement.textContent = '00:00';
                    clearInterval(timerInterval);
                    return;
                }
        
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                    if(timeLimitInSeconds){
                        timerElement.textContent = minutes + ':' + seconds;
                    }else{
                        currentText.textContent = 'کد شما منقضی شده است لطفا دوباره کد درخواست کنید';
                    }
            }
            var timerInterval = setInterval(startTimer, 1000);
          } 
        })
        .catch(function (error) {
        });

   
},[phone])

const nextCustomStep = () =>{
  
      axios.post('/api/auth/signin', {
        phone: getValues('phone'),
        verify: getValues('verify'),
      }).then(function (response) {
          if (!response.data.success) {
            toast.error(response.data.message);
            setError("verify", { type: "custom", message: response.data.message })
          } else {
            if (response.data.accessToken) {
              toast.success(response.data.message,{ duration: 5000 });
              localStorage.setItem("accessToken", response.data.accessToken);
              window.open("/dashboard", "_self");
              clearErrors("verify")
            }else{
              toast.success(response.data.message,{ duration: 5000 });
              nextStep()
              clearErrors("verify")
            }


          }


        })
        .catch(function (error) {
        });
}

  return (
    <>
     <label htmlFor="verify" className="flex mt-4 flex-col gap-y-1">
        <span className="text-sm">پیامکی هاوی کد تایید برای شماره <b className="mt-1">{getValues('phone')}</b> ارسال شد</span>
        <div className="relative py-2 w-full">
          <input
            type="number"
            name="verify"
            id="verify"
            {...register("verify", {
              required: "لطفا کد ارسالی را وارد کنید",
            })}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                setTimeout(() => {
                  nextCustomStep()
                }, 100)
              }
            }}
            placeholder="کد را وارد نمایید"
            className="sm:p-3 mt-2 sm:px-4 text-center px-3 p-2 tracking-widest w-full hide-arrow sm:text-xl text-lg   rounded  border "
          />
        </div>

        {errors.verify && (
          <span className="mr-5 text-red-500 text-sm">
            {errors.verify.message}
          </span>
        )}
      </label>
      <div className="mt-1 mr-5" >
     <Timer />
      </div>
      <div className="flex sm:scale-100 scale-90 justify-between sm:mt-8 mt-6">
        <NavigationButton direction="next" onClick={nextCustomStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>

    </>
  );
};

export default VerifyStep;
