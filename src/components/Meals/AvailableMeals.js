import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import Spinner from '../UI/Spinner/Spinner';
import classes from "./AvailableMeals.module.css";


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  // первоначальное состояние true - так как мы точно знаем, что при
  // загрузке компонента всегда сначала идет loading
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-updated-course-http-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error(`Something went wrong ${response.status} error`);
      }

      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          });
        }
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
      fetchMeals().catch(error => {
        setIsLoading(false);
        setHttpError(error.message);
        console.log(error.message);
      });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (httpError) {
    return <section className={classes.mealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
