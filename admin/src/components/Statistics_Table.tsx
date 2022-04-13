import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'count_id' | 'title' | 'count';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'count_id', label: 'ID', minWidth: 170 },
  { id: 'title', label: 'TITLE', minWidth: 100 },
  {
    id: 'count',
    label: 'COUNT',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  count_id: number;
  title: string;
  count: number;
}

function createData(
  count_id: number,
  title: string,
  count: number,
): Data  {
    return { count_id, title, count };
  }

const rows = [
  createData(1, 'Realme GT 2 Pro to launch in India on April 7: Specifications, features', 20 ),
  createData(2, 'Got some orange peel left over? Don’t throw it out because this is what you can do with it!', 19 ),
  createData(3, '2022 Yamaha YZF-R3 gets a new colour option', 18 ),
  createData(4, '‘Stop targeting our kin’: Maharashtra CM attacks BJP', 17),
  createData(5, 'Delhi Budget: 20 Lakh Jobs, Better Healthcare Among Top Announcements of Rozgaar Budget', 16 ),
  createData(6, `RRR box office collection Day 1: Jr NTR, Ram Charan's film starts roaring, gets a thunderous response`, 15 ),
  createData(7, 'Sony WF C500 TWS earbuds review: On-point audio, comfortable fit, missed functionality', 14 ),
  createData(8, 'Russian army says 1,351 soldiers killed in Ukraine', 13 ),
  createData(9, `Deleted Joker scene from superhero drama 'Batman: The Caped Crusader' released by director!`, 12 ),
  createData(10, 'Supercars Symmons Plains: Van Gisbergen charges to opening heat victory', 11 ),
  createData(11, `Tesla's Elon Musk May Be The World's First Trillionaire By 2022`, 10 ),
  createData(12, `No criminality if something said with a smile, says HC on Delhi riots hate speech case`, 9 ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}