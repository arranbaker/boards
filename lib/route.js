import { useRouter } from "next/router";
import { useAuth } from "./auth";

export function withProtected(Component) {
    return function WithProtected(props) {
        const { activeUser } = useAuth();
        const router = useRouter();

        if (!activeUser) {
            router.replace("/login");
            return null;
        }
        return <Component {...props} />;
    };
}