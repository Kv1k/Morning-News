import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom';

function ScreenSource() {
  const [sourceList, setSourceList]= useState([])
 
  useEffect( ()=>{
    async function loadDataAPI(){
      var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=fr`);
      var response = await apiResponse.json();
      setSourceList(response.sources)
      
    } 
    loadDataAPI()

    
   

  },[]);
  var showUkArticle = async ()=> {
    var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=us`);
    var response = await apiResponse.json();
    setSourceList(response.sources)
  }
  var showFrArticle = async ()=> {
    var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=fr`);
    var response = await apiResponse.json();
    setSourceList(response.sources)
  }
  
  var styleFlag= { margin: '10px', width:'60px'}
  
  return (
    <div>
        <Nav/>
       
       <div className="Banner" style={{textAlign: 'center'}}>
          <img src='./images/fr.png' onClick={() => {showFrArticle()}} style={styleFlag}/>
          <img src='./images/uk.png' onClick={() => {showUkArticle()}} style={styleFlag}/>
        </div>
        
          
        <div className="HomeThemes">
         
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                     <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`./images/${item.category}.png`} />}
                        title={<Link to = {`/articles/${item.id}`}>{item.name} </Link>}
                        
                        description={item.description}

                      />
                    </List.Item>
                  )}
                />


      </div>
                 
      </div>
  );
}

export default ScreenSource;
