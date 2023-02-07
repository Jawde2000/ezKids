import { Box, Container} from '@mui/material';
import { makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        background: "linear-gradient(to right, #FDB813, #F9A01B)",
        left:0,
        bottom:0,
        right:0,
    }
}));



function Footer() {
    const classes = useStyles();
    return (
        <footer>
            <Box className={classes.footer} px={{xs: 2, sm:2}} py={{xs:10, sm:4}} style={{paddingTop: "10px"}}>
                <Container maxWidth="lg" pb={{xs:5, sm:0}}>
                    <Box textAlign="center">
                        EZkids &reg;{new Date().getFullYear()} 
                    </Box>
                    <Box textAlign="center" >
                        All Rights Reserved By Pikachu Technologies
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}

export default Footer
