import styled from 'styled-components'
import {CiSearch} from 'react-icons/ci'
import {GiHamburger} from 'react-icons/gi'
import { Container,AppNameComponent,SearchComponent,Header } from './headerComponent';
import { RecipeContainer, RecipeListContainer,IngredientsName,CompleteRecipe,RecipeName } from './recipeContainer';
import { useState,useEffect } from 'react';
import DialogBox from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from './Dialog'

import Axios from 'axios'

const API_ID="397b4c44"
const API_KEY="33a6a2e4710265ca15a6b0928b219e4b	"

function App() {
 const [timeoutID,setTimeoutID]=useState();
 const [recipeList,setRecipeList]=useState([]);
 const [arr,setArr]=useState([]);

 const fetchAPI=async (searchString)=>{

  const response =await Axios.get( 
    `https://api.edamam.com/api/recipes/v2?type=public&q=${searchString}&app_id=397b4c44&app_key=33a6a2e4710265ca15a6b0928b219e4b`
    )

    setRecipeList(response.data.hits)
    };



 
 const [show,setShow]=useState('');





  const handle_search_change=(e)=>{
clearTimeout(timeoutID);
    const timeout =  setTimeout(()=>fetchAPI(e.target.value),500); 
  setTimeoutID(timeout)
  }

  

  return (
    <div className="App">
      <Container>
    <Header>
      <AppNameComponent>
        <GiHamburger style={{marginRight:12,color:'yellow'}}/>
      Recipe Finder
      </AppNameComponent>
      <SearchComponent>
      <CiSearch style={{color:'black',background:'white',height:42,paddingLeft:10,fontSize:30}}/>
<input type='text'
placeholder="Search for Recipe"
style={{border:'none',height:40,letterSpacing:1,width:480,outline:'none'}}
onChange={handle_search_change}
>
</input>
      </SearchComponent>
      </Header>

<RecipeListContainer>

  {
    recipeList.length > 0 ?    ( recipeList.map((item)=>{
      return(
      <>
        {show===item.recipe.image ? 
        <DialogBox open={true}>
        <DialogTitle>
          Ingredients
        </DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <th>Ingredients</th>
              <th>Weight (in g)</th>
            </thead>
            <tbody>
              { item.recipe.ingredients.map((ingrd)=>{
               return(
              <tr>
                <td>{ingrd.text}</td>
                <td>{ingrd.weight}</td>
              </tr>
               )


              })
              
              
               }
            </tbody>
          </table>

        </DialogContent>
        <DialogActions>
        <IngredientsName onClick={()=>window.open(item.recipe.url)}>See More</IngredientsName>
      <CompleteRecipe onClick={()=>setShow('')}>Close</CompleteRecipe>
        </DialogActions>
        
          </DialogBox>
          : ''}


      <RecipeContainer key={item.recipe.image}>
      <img className='item_img' src={item.recipe.image} style={{height:250}}/>
      <RecipeName>{item.recipe.label}</RecipeName>
      <IngredientsName onClick={()=>setShow(item.recipe.image)}>Ingredients</IngredientsName>
      <CompleteRecipe onClick={()=>window.open(item.recipe.url)}>see complete Recipe</CompleteRecipe>
    </RecipeContainer>
    
    </>
      )
    
    }
    )) : <div style={{display:"flex",flexDirection:'column',textAlign:'center',alignItems:'center',justifyContent:'center'}}><GiHamburger style={{fontSize:100,marginTop:160}}></GiHamburger>
    <span style={{fontSize:28}}>Search for recipe</span>
    </div>
      
    
    
  }
  
  </RecipeListContainer>
 
  
  
 
  
   
  



    </Container>
    
    
    </div>
  );
}

export default App;
