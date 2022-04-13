import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";

type LogoutProps = {
    setLogin: (Login: boolean) => void;
  };

function Logout({ setLogin }:LogoutProps){

    const navigate = useNavigate();

    const handleLogout = () => {
        setLogin(false);
        window.location.replace("http://localhost:3000");
    }

    const handleBack = () => {
        navigate("/");
    }

    return(
        <Container>
            <h1>Are you sure?</h1>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={handleBack}>Back</Button>
        </Container>
        
    )
}

export default Logout