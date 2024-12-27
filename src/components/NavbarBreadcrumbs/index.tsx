import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme?.customVars?.palette?.action?.disabled ?? 'defaultColor', // Provide a default color
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

const pages = [
  { link:'project', tabName:'Project'},
  { link:'dashboard', tabName: 'Dashboard'},
]

const NavbarBreadcrumbs = () => {

  const location = useLocation();
  const currentLink = location.pathname.split('/').pop();
  const currentPage = pages.find(page => page.link === currentLink);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">{currentPage?.tabName}</Typography>
    </StyledBreadcrumbs>
  );
}


export default NavbarBreadcrumbs;