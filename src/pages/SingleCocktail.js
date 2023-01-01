import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktails] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getcocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: cocktailName,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            stringredient1,
            stringredient2,
            stringredient3,
            stringredient4,
            stringredient5,
          } = data.drinks[0];
          const ingredients = [
            stringredient1,
            stringredient2,
            stringredient3,
            stringredient4,
            stringredient5,
          ];
          const newCocktail = {
            cocktailName,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktails(newCocktail);
        } else {
          setCocktails(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getcocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  } else {
    const {
      cocktailName,
      image,
      info,
      category,
      glass,
      instructions,
      ingredients,
    } = cocktail;

    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{cocktailName}</h2>
        <div className="drink">
          <img src={image} alt={cocktailName}></img>
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span> {cocktailName}
            </p>
            <p>
              <span className="drink-data">category :</span> {category}
            </p>
            <p>
              <span className="drink-data">info :</span> {info}
            </p>
            <p>
              <span className="drink-data">glass :</span> {glass}
            </p>
            <p>
              <span className="drink-data">instructons :</span> {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients :</span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
