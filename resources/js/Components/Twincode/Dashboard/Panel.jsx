import { twMerge } from "tailwind-merge";

function Panel({ children, className }) {
    return (
        <div className={twMerge("flex gap-4 bg-white shadow-md p-4 rounded-lg", className)}>
            {children}
        </div>
    );
}
export default Panel;
