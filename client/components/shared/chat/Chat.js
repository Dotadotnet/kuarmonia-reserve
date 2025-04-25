// pages/_app.js
"use client";
import { useEffect } from "react";


export default function Chat() {
      
    useEffect(() => {
        window.CRISP_RUNTIME_CONFIG = {
            locale : "fr"
          };     
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "96c59817-5fcc-48e1-a63c-6f947cf5cee9";
        (function () {
            let d = document;
            let s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
        })();
        setTimeout(() => {
            let chat_button = document.querySelector("span.cc-157aw");
            let function_edite = () => {

                let alerts = document.querySelectorAll('div.cc-1no03 a[role~=alert]');
                let links = document.querySelectorAll('div.cc-1no03 a[rel~=nofollow]');
                let input_email = document.querySelector('div.cc-1no03 input[name~=message_field_identity-email]');

                alerts.forEach(alert => {
                    alert.remove()
                });
                links.forEach(link => {
                    link.remove()
                });
                if (input_email) {
                    input_email.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.remove()
                }
                let all_elements = document.querySelectorAll('div.cc-1no03 *');
                all_elements.forEach(element => {
                    element.style.cssText += 'font-family:Vazir !important';
                });
                let option_button = document.querySelector('a.cc-8ve5w.cc-gge6o');
                if (option_button) {
                    option_button.remove();
                }
                let width_doc = document.body.clientWidth;
                let chat = document.querySelector('a.cc-1m2mf');
                let ping_div_chat = document.querySelector('div.ping-div-chat');
                if (width_doc < 768) {
                    
                    if (width_doc > 479) {
                        let margin_right = (width_doc - 60) / 2;
                        var style = 'right : ' + String(margin_right) + 'px ' + '!important; bottom : 52px !important'
                    } else {
                        let margin_right = (width_doc - 54) / 2;
                        var style = 'right : ' + String(margin_right) + 'px ' + '!important; bottom : 55px !important'
                    }                     
                    if (chat) {
                        chat.setAttribute("style", style);
                    }
                    if (ping_div_chat) {
                        ping_div_chat.setAttribute("style", 'dispaly:none');
                    }
                    if (document.querySelector('span.cc-157aw.cc-1kgzy'))
                        document.querySelector('span.cc-157aw.cc-1kgzy').setAttribute('style', 'background-color : #22C55E !important')
                } else {

                    let style = 'right : ' + '50px ' + `!important; bottom : 25px !important`

                    if (chat) {
                        chat.setAttribute("style", style);
                    }
                    if (ping_div_chat) {
                        ping_div_chat.setAttribute("style", 'right : ' + '49.3px ' + `!important; bottom : 24.8px !important`);
                    }
                    if (document.querySelector('span.cc-157aw.cc-1kgzy')) {
                        document.querySelector('span.cc-157aw.cc-1kgzy').setAttribute('style', 'background-color : #22C55E !important')
                    }
                }
            }
            if(document.querySelector('section.loader-div')){
                document.querySelector('section.loader-div').remove()                
            }
            
            let interval = setInterval(() => { 
                function_edite();
            }, 300);
        }, 500)
    }, []);

    return (
        <div className="fixed z-50   ping-div-chat ping-animation shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-transparent hover:border-[rgb(34,197,94)]   bg-[rgb(34,197,94)] w-[60px] h-[60px] text-white transition ease-in duration-200 ">
            <span className=" animate-ping border-[rgb(34,197,94)] absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
        </div>
    );
}
