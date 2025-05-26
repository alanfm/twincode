import { useRef } from "react";

const ToolTip = ({ children, tooltip }) => {
    const tooltipRef = useRef(null);
    const container = useRef(null);

    return (
        <div
            ref={container}
            onMouseEnter={({ clientX }) => {
                if (!tooltipRef.current || !container.current) return;
                const { left } = container.current.getBoundingClientRect();

                tooltipRef.current.style.left = clientX - left + "px";
            }}
            className="group relative inline-block"
        >
            {children}
            {tooltip ? (
                <span
                    ref={tooltipRef}
                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-neutral-500 text-white font-light text-sm py-1 px-2 rounded absolute top-full mt-0 whitespace-nowrap"
                >
                    {tooltip}
                </span>
            ) : null}
        </div>
    );
};

export default ToolTip;
