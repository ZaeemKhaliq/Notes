import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {db} from './firebase';
import firebase from 'firebase';

function Notes(){

  const [allDetails, setAlldetails] = useState([]);

  useEffect(() => {
    db.collection("Notes")
			.onSnapshot((snapShot)=>{
				setAlldetails(snapShot.docs.map(doc => 
					({
                        id:doc.id,
                        data:doc.data()})
                        ))
					
			})
  },[])

  console.log(allDetails);


  const [display, setDisplay] = useState('none');


  const titlestyle = {
    width: 300,
    height: 30,
    fontSize: 20,
    display: display,
    marginBottom: 10
  };

  const descriptionstyle = {
    display: display,
    marginBottom: 10,
    fontFamily: 'Arial'
  };

  const liststyle = {
    textAlign: 'left',
    fontSize: 24,
    padding: 0,
    listStyle: 'none',
    width: '50%',
    margin: '0 auto'
  };
  const listitem = {
    backgroundColor: 'NavajoWhite',
    border: '1px solid burlywood',
    borderRadius: 7,
    margin: '8px 0px'
  };
  const deletebutton = {
    float: 'right',
    borderRadius: 5,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 0,
    padding: 6
  };

  const listdescrip = {
    backgroundColor: 'Cornsilk',
    border: '1px solid burlywood',
    borderRadius: 7,
    marginTop: '5px',
    marginBottom: -1,
    padding: '5px',
    textAlign: 'center',
    fontSize: 18
  };


  const [task,setTask] = useState({});
  const [alltask, setAlltask] = useState([]);

  const handleChange = ({target}) =>{
        const val = target.value;
        const name = target.name;
        setTask((prev) => ({
            ...prev,
            id: Date.now(),
            [name]: val
        }));
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      if(!task.title) {
        alert("Title is necessary!");
        return;
      };


      // setAlltask((prev) => [...prev,task]);

      
      if(!task.description){
        db.collection("Notes").doc("edWHFP3W24hbqbIGf41X").update({
          tasks: firebase.firestore.FieldValue.arrayUnion({
            head: task.title,
            subhead: ""
          })
        })
      }
      else{
        db.collection("Notes").doc("edWHFP3W24hbqbIGf41X").update({
          tasks: firebase.firestore.FieldValue.arrayUnion({
            head: task.title,
            subhead: task.description
          })
        })
      }


      setTask({});
      document.getElementById('but').style.display = 'block';
      document.getElementById('but1').style.display = 'none';
      document.getElementById('but2').style.display = 'none';
      setDisplay('none');
  };

  const handleDelete = (taskIdToRemove,head,subhead) => {
    // setAlltask((prev) => prev.filter((t) => t.id!==taskIdToRemove));
    db.collection("Notes").doc("edWHFP3W24hbqbIGf41X").update({
      tasks: firebase.firestore.FieldValue.arrayRemove({
        head: head,
        subhead: subhead
      })
    });

  };
  

  const handleClick = () => {
    document.getElementById('but').style.display = 'none';
    document.getElementById('but1').style.display = 'block';
    document.getElementById('but2').style.display = 'block';
    setDisplay('block');
  };

  const handleCancel = () => {
    document.getElementById('but').style.display = 'block';
    document.getElementById('but1').style.display = 'none';
    document.getElementById('but2').style.display = 'none';
    setTask({});
    setDisplay('none');
  };



  return (
    <main>
      <div style={{backgroundColor: '#44B1E1',color: 'white', padding: '10px 0px',marginBottom: 20}}>
        <h1 style={{margin:0}}>WELCOME TO MY NOTES!</h1>
        <button onClick={handleClick} id="but">+</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input id="title" placeholder="Title..." type="text" name="title" style={titlestyle} onChange={handleChange} value={task.title || ""}/>
        </div>

        <div>
          <textarea id="description" placeholder="Description..." rows="10" cols="55" style={descriptionstyle} onChange={handleChange} name="description" value={task.description || ""}></textarea>
        </div>

        <div>
          <button id="but1" type="submit">Add New Task!</button>
          <button id="but2" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    
    
      <div style={{backgroundColor: '#C3D9DF', margin:'0 auto', width: '60%', paddingBottom: 10}}>

        <h1 style={{textAlign: 'center'}}>Tasks</h1>
        <ul style={liststyle}>
                    
                    {/* {alltask.map(({title,description,id})  => {
                      
                      return (

                        <li style={listitem}>

                          <div>
                            <h3 style={{ margin: 0, textAlign: 'center' }}>{title}</h3>
                            {!description ? null : <p style={listdescrip}>{description}</p>}
                            <button onClick={() => handleDelete(id)}>X</button>
                          </div>

                        </li>

                      );
                    })} */}

                    {allDetails.map(item => {
                      return (
                        <>
                          {item.data.tasks.map((obj,index)=> {
                            return (
                              <>
                                <li style={listitem}>
                                  <div>
                                    <h3 style={{ margin: 0, textAlign: 'center' }}>{obj.head}</h3>
                                    {!obj.subhead ? null : <p style={listdescrip}>{obj.subhead}</p>}
                                    <button onClick={()=>handleDelete(index,obj.head,obj.subhead)}>X</button>
                                  </div>
                                </li>
                              </>
                            )
                          })}
                        </>
                      );
                    })}
        </ul>
      </div>
    </main>
  );
}

ReactDOM.render(<Notes />, document.getElementById('root'));