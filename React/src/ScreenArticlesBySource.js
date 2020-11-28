import React, { useEffect, useState} from 'react';

import './App.css';
import { Card, Icon, Modal, Button} from 'antd';
import Nav from './Nav'
import {connect} from 'react-redux';

const { Meta } = Card;


function ScreenArticlesBySource(props) {
  const [articles, setArticle]= useState([])
  const [visible, setVisible]= useState(false);
  const [title, setTitle]= useState();
  const [content, setContent]= useState();
  
  useEffect( ()=>{
    console.log('je suis dans le useEffect');
    
    const findArticles= async()=>{
      var articlesData= await fetch(`https://newsapi.org/v2/top-headlines?sources=${props.match.params.id}&apiKey=ecae1c873b6f419eb922a2078e805a2e`);
      var responseArticles= await articlesData.json();
      console.log(responseArticles);
      
      setArticle(responseArticles.articles)
      
    } 

    findArticles()
   

  }, [props.match.params.id]);
  var showModal = (content,title) => {
    setVisible(true)
    setContent(content)
    setTitle(title)
  };
  var handleOk = (e)=> {
    setVisible(false)

  };
  var handleCancel = (e) => {
    setVisible(false)
  };
  var article= articles.map((article, i)=>{
    return(
    
              <div key={i} style={{display:'flex',justifyContent:'center'}}>

                <Card
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt="example"
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                    <Icon onClick={() => {showModal(article.content, article.title)}} type="read" key="ellipsis2" />,
                      <Icon onClick={ ()=> props.onLikeClick(article) } type="like" key="ellipsis"/>
                  ]}
                  >

                <Modal 
                   
                    maskStyle={{backgroundColor: 'rgba(0, 0, 0, 0.08)'}}
                    title={title}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    
                >
                  
                <p>{content}</p>
                  
                </Modal>
                  <Meta
                    title={article.title}
                    description={article.description}
                  />

                </Card>

              </div>


            

            
    )
    
  })
  return (

    <div>
         
            <Nav/>

            <div className="Banner"/>

            <div className="Card">
              {article}
            </div>
            
         
      
      </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    onLikeClick: function(article) { 
        dispatch( {type: 'like', articleLike: article} ) 
    }
  }
}

export default connect(
    null, 
    mapDispatchToProps
)(ScreenArticlesBySource);

