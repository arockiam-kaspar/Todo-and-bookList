import React from 'react';
import { Table } from 'reactstrap';

const BooksTable = ({data, searchvalue, pageSize, currentPage})  => {
let startIndex = currentPage === 1 ? (currentPage -1) : ((currentPage-1) * pageSize);
const pageSizeData  = data.slice(startIndex, startIndex + pageSize);
const filteValue = pageSizeData.filter(str => str.best_book.title.toLowerCase().indexOf(searchvalue.toLowerCase())!== -1)

  return (
    <div>
      <Table>
        <thead>
            <tr>
            <th>#</th>
            <th>Book</th>
            <th>Author</th>
            </tr>
        </thead>
        <tbody>
        {filteValue.length > 0 ? (filteValue.map((value, idx) => {
            return (
              <tr key={idx}>
                <td>{idx+1+startIndex}</td>
                <td>{value.best_book.title}</td>
                <td>{value.best_book.author.name}</td>
              </tr>
            )
          })) : 'No Records Found'}
        </tbody>
        </Table>
      </div>
  )
}
export default React.memo(BooksTable);