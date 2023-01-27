import { Box, Container} from '@mui/material';
import { makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        background: "linear-gradient(0deg, rgba(245,245,220,1) 37%, rgba(253,187,45,1) 100%)",
        left:0,
        bottom:0,
        right:0,
    }
}));



function Footer() {
    const classes = useStyles();
    return (
        <footer>
            <Box className={classes.footer} px={{xs: 3, sm:7}} py={{xs:5, sm:7}} style={{paddingTop: 10}}>
                <Container maxWidth="lg">
                    <Box textAlign="center" pt={{xs: 5, sm:10}}>
                        EZkids &reg;{new Date().getFullYear()} 
                    </Box>
                    <Box textAlign="center" pb={{xs:5, sm:0}}>
                        All Rights Reserved By Pikachu Technologies
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer
