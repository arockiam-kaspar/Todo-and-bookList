import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TableBooks  from './Table';
import records from '../data/records.json';
import '../styles/Books.scss';

export default class Books extends Component {
  state = {
    searchvalue : '',
    data: [],
    currentPage: 0,
    pageSize: 5,
  }
  componentDidMount = () => {
      setTimeout( () =>{
        this.setState({
              data: records.GoodreadsResponse.search.results.work,
              currentPage: 1,
            })
      }, 1000);
  }
  
  onChaneText =(e) =>{
    const { value } = e.target;
    this.setState({
      ...this.state,
      searchvalue: value,
    })
  }
  onNextPrev = (page) =>{
    const { pageSize, data, currentPage } = this.state;
    const newPage  = page === "next" ? currentPage + 1 : currentPage - 1;
    if(newPage >0 && (Math.ceil(data.length / pageSize) >= newPage)){
      this.setState({
        ...this.state,
        currentPage: newPage,
      })
    }
  }
  render() {
    const { searchvalue, currentPage, pageSize, data } = this.state;
    const tableProps = {
      data,
      searchvalue,
      pageSize,
      currentPage,
    };
    const isNext = Math.ceil(data.length / pageSize) > currentPage;
    const isPrev = currentPage > 1;
  
    return (
      <div className="booksWrapper">
        <div className='container'>
          <div className='row'>
          <div className="col-lg-12 center-block text-center">
          <header>
            <h3>Books</h3>
          </header>
            <div className="searchContainer">
              <input type="text" 
                className='search-box' 
                value={searchvalue} 
                onChange={this.onChaneText}
                placeholder='search by book name'
                />
              <div className='back'>Back<Link to="/">Todo</Link></div>
            </div>
            <TableBooks {...tableProps} />
          <nav  aria-label="Page navigation example">
            <ul className="pagination pagination-lg">
              <li className="page-item">
                <div className={`page-link ${!isPrev && 'disabled'}`} aria-label="Previous" onClick={(e) => this.onNextPrev('prev')}>
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </div>
              </li>
              <li className="page-item active">
                <div className="page-link">{currentPage}</div>
              </li>
              <li className="page-item">
                <div className={`page-link ${!isNext && 'disabled'}`} aria-label="Next" onClick={(e) => this.onNextPrev('next')}>
                  <span aria-hidden="true" >»</span>
                  <span className="sr-only">Next</span>
                </div>
              </li>
              </ul>
          </nav>
        </div>
          </div>
        </div>
      </div>
    )
  }
}
