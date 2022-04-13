import { Container, Grid, Typography } from "@mui/material"

function ReporterHome() {
   
    return(
        <>
            <Container fixed sx={{ py: 2 }}>
                <Typography variant="h1" component="div" color= "primary" textAlign= "center" gutterBottom>
                    Welcome Admin
                </Typography>
            </Container>
        </>
    )
}

export default ReporterHome