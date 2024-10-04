//Einav Kogut: 318902285
//Mili Segal: 208297333
import { React, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// idb.js is the JS library for handling the IndexedDB database
import idb from "./idb.js";

// Initialize Report component
function Report(props) {
  const [filteredItems, setFilteredItems] = useState([]);
  const { month, year, handleSubmit } = props;

  // useEffect for rendering every time handleSubmit, month, or year has changed for a dynamic experience
  useEffect(() => {
    // Function to generate report
    async function generateReport(month, year) {
      try {
        // Open the IndexedDB database
        const db = await idb.openCalorisDB("caloriesdb", 1);

        // Retrieve all items from IndexedDB
        const allItems = await idb.getAllItems(db);

        // Filter items by month and year
        const filteredItems = allItems.filter((item) => {
          const itemDate = new Date(item.date);
          const itemMonth = itemDate.getMonth() + 1; // Months are zero-based (0 = January), so add 1
          const itemYear = itemDate.getFullYear();

          return itemMonth === month && itemYear === year;
        });

        // Update state with the filtered items
        setFilteredItems(filteredItems);
        console.log(filteredItems);
      } catch (error) {
        console.error("Error generating report:", error);
      }
    }

    // Call generateReport function
    generateReport(month, year);
  }, [handleSubmit, month, year]); // Add month and year to dependencies

  return (
      <div className="Report">
        {/** Generates the TableContainer */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {/** Report columns would be Id, Description, Number of Calories, Date */}
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Number of Calories</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/** Assigning values to table cells */}
              {filteredItems.map((item) => (
                  <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="left">{item.description}</TableCell>
                    <TableCell align="left">{item.numOfCalories}</TableCell>
                    <TableCell align="left">{item.category}</TableCell>
                    <TableCell align="left">{item.date}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

export default Report;
