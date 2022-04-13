import { Container, Grid, Typography } from "@mui/material"
import NewsCard from './ReporterNewsCard'

function ReporterHome() {
   
    return(
        <>
            <Container fixed sx={{ py: 2 }}>
                <Typography variant="h6" color="primary">
                    {/* News */}
                </Typography>

                <NewsCard />

            </Container>
        </>
    )
}

export default ReporterHome