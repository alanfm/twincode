import { useAlert } from "@/Context/AlertContext";
import Alert from "@/Components/Twincode/Dashboard/Alert";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function AlertWrapper() {
    const { showAlert } = useAlert();
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.alert) {
            showAlert(flash.alert.message, flash.alert.type);
        }
    }, [flash.alert]);

    return <Alert />;
}
