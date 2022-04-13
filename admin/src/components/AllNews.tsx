import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import AllNewsCard from "./AllNewsCard"

function AllNews() {
 
    return (
        <>
            <Container fixed sx={{ py: 2 }}>
                <Typography variant="h6" color="primary">
                        All News
                    <AllNewsCard/>
                </Typography>
            </Container>
        </>
    )
}

export default AllNews