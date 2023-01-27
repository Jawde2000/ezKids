import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 150,
  },
}));

const data = [
  {
    rank: 1,
    name: 'Lim Lam Pa',
    score: 1000,
  },
  {
    rank: 2,
    name: 'Pu Mian Bo',
    score: 900,
  },
  {
    rank: 3,
    name: 'Nee Lam Bo',
    score: 890,
  },
  {
    rank: 4,
    name: 'Lou Shi Lim',
    score: 890,
  },
  {
    rank: 5,
    name: 'Wa Tha Huat',
    score: 885,
  },
  {
    rank: 6,
    name: 'Him Seng Jon',
    score: 882,
  },
];

export default function RankingBoard() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow  display="flex">
            <TableCell>Rank {<MilitaryTechIcon alignItems="center" justifyContent="center" style={{ color: 'gold'}}/>}</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.rank}>
              <TableCell>{row.rank}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}