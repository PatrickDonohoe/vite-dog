import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
    children: React.ReactNode;
}

const AuthChecker = ({ children }: Props) => {
    const navigate = useNavigate();
    const {isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);

    // check to see if user is already in auth0user table
    // run query by auth_user
    // if not in auth_user, create_profile; if so, continue
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/twsearch');
        }
    }, [isLoading, isAuthenticated, navigate]);


    return (
      <>
        <div>{children}</div>
      </>
    );
};

export default AuthChecker;