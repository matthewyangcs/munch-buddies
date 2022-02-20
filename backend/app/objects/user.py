from .animal import ANIMAL_NAME_TO_OBJ
from .food import FOOD_NAME_TO_OBJ, Food, Nutrient

"""Stores user's data"""


class User:
    def __init__(self, inventory: dict[str, int]):
        self.inventory: dict[str, int] = inventory or dict.fromkeys(
            FOOD_NAME_TO_OBJ.keys(), 0
        )

    """Adds food to inventory"""

    def add_food(self, food_id, quantity=1):
        if food_id not in self.inventory:
            return False
        self.inventory[food_id] += 1
        return True

    def remove_food(self, food_id, quantity=1):
        self.inventory[food_id] -= 1
        return True

    def get_inventory(self):
        return self.inventory

    def get_food_count(self, food_id):
        return self.inventory[food_id]
