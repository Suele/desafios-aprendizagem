import React, { Component } from "react";
import RecipeItem from "./RecipeItem";
import { getRecipesByName, getRecipesByIngredients } from "../services/recipes";

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      recipe: {
        thumbnail: "",
        title: "",
        ingredients: ""
      },
      similarRecipes: []
    };
  }

  componentWillMount() {
    const { page } = this.state;
    const { match } = this.props;

    getRecipesByName(match, page)
      .then(results => {
        results
          .filter(result => {
            return result.title === match;
          })
          .map(result => {
            console.log(result);
            return this.setState({ recipe: result });
          });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    const { page } = this.state;
    const { match } = this.props;

    getRecipesByName(match, page).then(results => {
      results
        .filter(result => {
          return result.title === match;
        })
        .map(result => {
          console.log("result: ", result);
          console.log("result.ingredients: ", result.ingredients);
          return getRecipesByIngredients(result.ingredients, page).then(
            resultsIngredients => {
              this.setState({ similarRecipes: resultsIngredients.slice(0, 4) });
              console.log("similarRecipes: ", this.state.similarRecipes);
            }
          );
        });
    });
  }

  render() {
    const { thumbnail, title, ingredients } = this.state.recipe;
    const { recipe, similarRecipes } = this.state;
    const { match } = this.props;

    console.log(match);
    console.log(recipe.title);
    return (
      <div>
        {recipe.title ? (
          <div>
            <div>
              <img
                src={thumbnail || "https://via.placeholder.com/350x260"}
                alt={title}
              />
              <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
                <p className='card-text'>
                  <strong>Ingredients: </strong>
                  {ingredients}
                </p>
              </div>
            </div>

            <h5 className='card-title'>Similar recipes</h5>
            <div className='row'>
              {similarRecipes.map(similarRecipe => {
                return (
                  <RecipeItem
                    key={similarRecipe.ingredients}
                    thumbnail={similarRecipe.thumbnail}
                    title={similarRecipe.title}
                    ingredients={similarRecipe.ingredients}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <h1>No Result to show {match}</h1>
        )}
      </div>
    );
  }
}

export default RecipePage;
