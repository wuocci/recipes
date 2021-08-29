import React, { useEffect, useState, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RecipeDialog from './RecipeDialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OpenWithIcon from '@material-ui/icons/OpenWith';


/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const TitlebarImageList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
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

export default TitlebarImageList;

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
        return(
            <div className="recipe-grid">
                <Grid container spacing={3}>
                {recipes.map((item) => (
                    <Grid item xs={3}>
                        <Card className="recipe-card">
                        <CardHeader
                            title={item.title}
                            subheader={item.published_date}
                        />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {item.descpription
}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="add to favorites">
                                    <OpenWithIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid> 
                ))}
                </Grid>
            </div> 
        )
    }
}
    
