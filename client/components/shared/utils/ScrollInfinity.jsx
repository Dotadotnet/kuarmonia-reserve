import language from "@/app/language";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

function ScrollInfinity({ children, className, speed = 1 }) {
    const lang = useLocale();
    const class_lang = new language(lang);
    const dir = class_lang.getInfo().dir;
    const [scrollInterval, setsScrollInterval] = useState(false);
    const [scrollTimeout, setsScrollTimeout] = useState(false);
    const ref = useRef(null);
    const [data, setDate] = useState([children]);

    useEffect(() => {
        // window.addEventListener("resize", () => {
        //     setDate([children])
        // })
        const div = ref.current;
        if (div) {
            if (!scrollInterval) {
                clearInterval(scrollInterval)
                clearTimeout(scrollTimeout)
                let scrollIntervalid = setInterval(() => {
                    if (dir == "rtl") {
                        div.scrollLeft -= speed
                    } else {
                        div.scrollLeft += speed
                    }
                }, 1)
                setsScrollInterval(scrollIntervalid)
            }
        }
    })
    return (
        <div className={"relative w-full before:absolute import-class  before:top-0 before:-right-[1px] before:h-full  before:bg-linear-to-r  before:from-transparent  before:w-2 after:absolute  after:top-0 after:-left-[1px] after:h-full  after:bg-linear-to-l  after:from-transparent  after:w-2 " + className}>
            <div
                onMouseEnter={() => {
                    if (scrollInterval) {
                        clearInterval(scrollInterval)
                        clearTimeout(scrollTimeout)
                        setsScrollInterval(1)
                    }
                }}

                onMouseLeave={() => {
                    if (scrollInterval == 1) {
                        clearTimeout(scrollTimeout)
                        clearInterval(scrollInterval)
                        let idSetTimeout = setTimeout(() => {
                            if (scrollInterval == 1) {
                                clearInterval(scrollInterval)
                                clearTimeout(scrollTimeout)
                                setsScrollInterval(false)
                            }
                        }, 3000)
                        setsScrollTimeout(idSetTimeout)
                    }
                }}
                onScroll={() => {
                    const div = ref.current;
                    const maxScrollLeft = div.scrollWidth - div.clientWidth;
                    if (dir == "rtl") {
                        if ((maxScrollLeft + div.scrollLeft) < 10) {
                            setDate(data.concat(children))
                        }
                    } else {
                        if ((maxScrollLeft - div.scrollLeft) < 10) {
                            setDate(data.concat(children))
                        }
                    }
                }}
                ref={ref} className={` w-full overflow-x-auto  infinity-box-scroll  `}>
                <div className="flex justify-center items-center w-fit gap-2  flex-nowrap">
                    {data.map((items) => items)}
                </div>
            </div>
        </div>
    );
}

export default ScrollInfinity;