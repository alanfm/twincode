import AlertWrapper from "@/Components/Twincode/Wrappers/AlertWrappers";
import { AlertProvider } from "@/Context/AlertContext";

function RootLayout({ children }) {
    return (
        <AlertProvider>
            <AlertWrapper />
            <div>
                {children}
            </div>
        </AlertProvider>
    );
}

export default RootLayout;
