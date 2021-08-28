import React, { useEffect, useState, useRef } from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios'
import RecipeDialog from './RecipeDialog';


export default function RecipeGrid() {
    const [recipes, setRecipes] = useState(null)
    const [openDialog, setDialog] = useState(false)

    const openRecipe = () => {  
        setDialog(true)
    }


  const toggleModal = (val) => setDialog(val)


    //fetch recipes from mongodb
    useEffect(() => {
        fetch("http://localhost:8080/recipes")
        .then(response => response.json())
        .then(data => setRecipes(data))
      },[])

    //add loader until recipes are fetched
    if(recipes === null){
        return(
            <div>loading</div>
        )
    }

    else if(openDialog === true){
        return(
            <RecipeDialog openDialog={openDialog} toggleModal={toggleModal} 
        />)
    }


    else{
        return (
            <div className="recipe-grid">
            <ImageList rowHeight={180}>
                <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">December</ListSubheader>
                </ImageListItem>
                {recipes.map((item) => (
                <ImageListItem key={item.id}>
                    <ImageListItemBar
                    title={item.title}
                    subtitle={<span>by: {item.author}</span>}
                    actionIcon={
                        <IconButton aria-label={`info about ${item.title}`} onClick={openRecipe}>
                        <InfoIcon />
                        </IconButton>
                    }
                    />
                </ImageListItem>
                ))}
            </ImageList>
            </div>
        );
    }
}
    