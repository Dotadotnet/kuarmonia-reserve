"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import { useLocale, useTranslations } from "next-intl";

export default function Chat() {
    const lang = useLocale();
    const t = useTranslations("CrispChat");

    useEffect(() => {
        Crisp.configure("96c59817-5fcc-48e1-a63c-6f947cf5cee9", {
            locale: lang,
        });

        let interval;

        const timeout = setTimeout(() => {
            if (localStorage.getItem("theme") == "dark") {
                Crisp.setColorTheme("blue");
            } else {
                Crisp.setColorTheme("green");
            }

            const function_edite = () => {
                const default_massage = document.querySelector("span.cc-10y2t span.cc-dvx9d");
                if (default_massage) {
                    default_massage.innerHTML = t("0");
                }

                document.querySelectorAll('div.cc-1no03 a[role~=alert]').forEach(a => a.remove());
                document.querySelectorAll('div.cc-1no03 a[rel~=nofollow]').forEach(a => a.remove());

                const input_email = document.querySelector('div.cc-1no03 input[name~=message_field_identity-email]');
                if (input_email) {
                    input_email.closest('form')?.remove();
                }

                document.querySelectorAll('div.cc-1no03 *').forEach(el => {
                    el.style.cssText += 'font-family:Vazir !important';
                });

                const option_button = document.querySelector('a.cc-8ve5w.cc-gge6o');
                if (option_button) option_button.remove();

                const width_doc = document.body.clientWidth;
                const chat = document.querySelector('a.cc-1m2mf');
                const ping_div_chat = document.querySelector('div.ping-div-chat');

                if (width_doc < 768) {
                    let margin_right = (width_doc - (width_doc > 479 ? 60 : 54)) / 2;
                    const style = `right: ${margin_right}px !important; bottom: ${width_doc > 479 ? 52 : 55}px !important`;
                    if (chat) chat.setAttribute("style", style);
                    if (ping_div_chat) ping_div_chat.setAttribute("style", "display: none");
                } else {
                    if (chat) chat.setAttribute("style", "right: 50px !important; bottom: 25px !important");
                    if (ping_div_chat) ping_div_chat.setAttribute("style", "right: 49.3px !important; bottom: 24.8px !important");
                }

                const chat_bubble = document.querySelector('span.cc-157aw.cc-1kgzy');
                if (chat_bubble) {
                    chat_bubble.setAttribute('style',
                        localStorage.getItem("theme") === "light"
                            ? 'background-color: #22C55E !important'
                            : 'background-color: rgb(43,127,255) !important'
                    );
                }

                const loader = document.querySelector('section.loader-div');
                if (loader) loader.remove();
            };

            interval = setInterval(function_edite, 300);
        }, 500);

        // ✅ پاکسازی
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed z-50 ping-div-chat ping-animation shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-transparent hover:border-[rgb(34,197,94)] dark:hover:border-[rgb(43,127,255)] dark:bg-[rgb(43,127,255)] bg-[rgb(34,197,94)] w-[60px] h-[60px] text-white transition ease-in duration-200 ">
            <span className="animate-ping dark:border-[rgb(43,127,255)] border-[rgb(34,197,94)] absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
        </div>
    );
}
