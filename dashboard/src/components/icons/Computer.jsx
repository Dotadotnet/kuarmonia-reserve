

const Computer = ({ className, ...props }) => {
    return (
        <svg
            {...props}
            className={"w-7 h-7" + (className ? " " + className : "")}
            xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={6} strokeDashoffset={6} d="M12 21h5M12 21h-5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="6;0"></animate></path><path strokeDasharray={6} strokeDashoffset={6} d="M12 21v-4"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="6;0"></animate></path><path strokeDasharray={64} strokeDashoffset={64} d="M12 17h-9v-12h18v12Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.6s" values="64;0"></animate></path></g></svg>
    );
};

export default Computer;
