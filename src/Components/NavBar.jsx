import {AppBar ,Toolbar,styled, Typography, Container} from '@mui/material';

const Header = styled(AppBar)`
	color: #FFF;
	margin-bottom: 20px;
`


const NavBar = () => {
	return(
		<Header position="static">
			<Toolbar>
			<Container maxWidth="lg">
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					App Teste
				</Typography>
			  </Container>
			</Toolbar>
		</Header>
	)
}

export default NavBar;