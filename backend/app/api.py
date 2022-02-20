"""APIs for Frontend to Call

Note: By default, Fast API will return a JSON response obj, with the content as our msg"""
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from objects.food import Food, FOOD_NAME_TO_OBJ

from objects.animal import Animal, ANIMAL_NAME_TO_OBJ

from objects.user import User

# import .objects.food
# from objects import food

# from .objects.user import User

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000", "*"]


@app.get("/")
async def test_api() -> str:
    return "test success"


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

##########################################
### ACTUAL OBJECT DATA
animal_dict = ANIMAL_NAME_TO_OBJ
food_dict = FOOD_NAME_TO_OBJ
user = User(inventory=[])


######################################
### Animal APIs
@app.get("/animal/{animal_id}")
async def get_animal_info(animal_id: str) -> dict:
    animal = animal_dict[animal_id]
    return animal.to_dict()


@app.get("/animal/all/")
async def get_animal_dict() -> dict:
    animal_json_dict = {}
    for name, animal in animal_dict.items():
        animal_json_dict[name] = animal.to_dict()
    return animal_json_dict


#####################################
### Food APIs
@app.get("/food/{food_id}")
async def get_food_info(food_id: str) -> dict:
    food = food_dict[food_id]
    return food.to_dict()


@app.get("/food/")
async def get_food_dict() -> dict:
    food_json_dict = {}
    for food_name, food in food_dict.items():
        food_json_dict[food_name] = food.to_dict()
    return food_json_dict


######################################
### User Action APIs


@app.get("/inventory/")
async def get_inventory():
    return user.get_inventory()


# Add Food
@app.get("/inventory/add/{food_id}")
async def add_food(food_id: str):
    if user.add_food(food_id):
        return {"food_id": food_id, "quantity_left": user.get_food_count(food_id)}


# Schema for the json body
class MultipleFoods(BaseModel):
    food_counts: dict[str, int]


@app.put("/inventory/add/multiple/")
async def add_food_multiple(multiple_foods: MultipleFoods):
    """Pass in a count dictionary to add foods to inventory

    Returns the user's new inventory

    Example Body:
        {
            "food_counts": {
                "strawberry": 5,
                "apple": 5
            }
        }
    """
    food_counts = multiple_foods.food_counts

    for food_id, count in food_counts.items():
        for i in range(count):
            if not user.add_food(food_id):
                return False
    return user.get_inventory()


# Remove Food
@app.put("/inventory/remove/{food_id}")
async def remove_food(food_id):
    if user.remove_food(food_id):
        return {"food_id": food_id, "quantity_left": user.get_food_count(food_id)}


# Schema for the json body
class FeedFood(BaseModel):
    food_id: str
    animal_id: str


# Feed Animal
@app.put("/inventory/feedanimal/")
async def feed_animal(body: FeedFood):
    """
    Example body:
        {
            "food_id": "salmon",
            "animal_id": "DOG"
        }
    """
    food_id, animal_id = body.food_id, body.animal_id
    food, animal = food_dict[food_id], animal_dict[animal_id]
    # check that user has enough and animal is compatible
    if user.get_food_count(food_id) <= 0:
        raise HTTPException(status_code=404, detail="You don't have that food!")
    elif not animal.can_eat(food):
        raise HTTPException(status_code=404, detail="Food is incompatible!")

    animal.eat_food(food=food)
    user.remove_food(food_id=food_id)
    return {"food_id": food_id, "animal": animal.to_dict()}
