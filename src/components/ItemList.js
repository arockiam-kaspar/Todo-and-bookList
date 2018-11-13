import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ItemList extends Component {
    constructor(props){
        super(props);
        this.onChangeComplete = this.onChangeComplete.bind(this);
    }
    state = {
        addValue : '',
        updateValue: '',
        todoList: [],
        selectedIndex: null,
        isEdit: false,
        completed: [],
    };
    onAddItem = (e) =>{
        this.setState({
            ...this.state,addValue: e.target.value
        });
    }
    onHandleAdd = () =>{
        const { addValue } = this.state;
        const newList = [...this.state.todoList];
        newList.push(addValue);
        this.setState({
            todoList: newList,
            addValue: ''
        });
    }
    onRemoveItem = (e) =>{
        const newList = [...this.state.todoList];
        const index = e.target.getAttribute('data-index');
        newList.splice(index, 1);
        this.setState({
            ...this.state, 
            todoList: newList,
        });
    }
    onEditSaveItem = (e) =>{
        const { isEdit, updateValue } = this.state;
        const newList = [...this.state.todoList];
        const index = Number(e.target.getAttribute('data-index'));
        newList[index] = updateValue;
        if(!isEdit){
            this.setState({
                ...this.state, 
                isEdit: true,
                selectedIndex: index,
                updateValue: e.target.getAttribute('data-value')
            })
        }else{
            this.setState({
                ...this.state, 
                isEdit: !isEdit,
                todoList: newList,
            })
        }
    }
    onUpdateValue = (e) =>{
        this.setState({
            updateValue: e.target.value,
        })
    }
    onChangeComplete = (e, idx) =>{
        const completed  = [...this.state.completed]
        const newList = [...this.state.todoList];
        completed.push(newList[idx]);
        newList.splice(idx, 1);
        this.setState({
            ...this.state, 
            todoList: newList,
            completed,
        });
       
    }
    onHandleCompleteRemove = (e, idx) =>{
        const completed  = [...this.state.completed];
        completed.splice(idx, 1);
        this.setState({
            ...this.state, 
            completed,
        });
    }
  render() {
      const { addValue, todoList, isEdit, updateValue, selectedIndex, completed } = this.state;
    return (
      <div className="todoTopContainer">
       <h3 className='text-center'>TODO</h3>
      <div className='todoContainer'>
        <div className='add-wrapper panels'>
            <h3>ADD ITEM</h3>
            <div className='list-wrapper'>
                <input type="text" value={addValue} onChange={this.onAddItem}/>
                <span className='list-handle' onClick={this.onHandleAdd}>Add</span>
            </div>
        </div>
        <div className='todo-wrapper panels'>
            <h3>TODO ITEM</h3>
            <div className="checkbox">
                {todoList.map( (list, idx) => {
                    return (
                        <div className='todoMainContainer'>  
                            <label className='addEditWrapper'><input type="checkbox" name="optradio" onChange={(e) => this.onChangeComplete(e,idx)}/>
                            {(isEdit && selectedIndex === idx) ?  
                                <input type='text'  value={updateValue} onChange={this.onUpdateValue}/> 
                                : <span>{list}</span>
                            }
                            </label>
                            <div className='addEditButtonContainer'>
                            <span data-value={list} data-index={idx} onClick={this.onEditSaveItem}>
                            {!isEdit ? 'Edit': 'Save'}
                            </span>
                            <span data-index={idx} onClick={this.onRemoveItem}>Delete</span>
                            </div>
                            <div className='clear-fix'></div>
                       </div> 
                    )
                })}
            </div>
        </div>
        <div className='add-wrapper panels'>
            <h3>COMPLETED</h3>
            {completed && (completed.map((value, idx) =>{
                return(
                    <div key={idx} className='complete-container'>
                    <div className='complete-wrapper'>
                        <input type="checkbox" name={`completedradio-${idx}`} value={value}/>
                        <span style={{textDecoration: 'line-through'}}>{value}</span>
                    </div>
                        <span className='list-handle' onClick={(e) => this.onHandleCompleteRemove(e,idx)}>DELETE</span>
                    <div className='clear-fix'></div>
                    </div>
                )
            }))}
        </div>
        <div className="navigation">
            <span>Navigate to </span><Link to="/books">Books</Link>
        </div>
      </div>
      </div>  
    )
  }
}
