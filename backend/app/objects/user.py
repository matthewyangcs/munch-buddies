import datetime

from .animal import ANIMAL_NAME_TO_OBJ
from .food import FOOD_NAME_TO_OBJ, Food, Nutrient
from dataclasses import dataclass
from datetime import date

"""Stores user's data"""


@dataclass
class FoodEvent:
    food_id: str
    timestamp: datetime.date = 0
    # Way to get the # of days between two dates:
    # (d1 - d0).days


class User:
    def __init__(self, inventory: dict[str, int], history=[]):
        self.inventory: dict[str, int] = inventory or dict.fromkeys(
            FOOD_NAME_TO_OBJ.keys(), 0
        )
        self.history: list[datetime.date] = history

    def add_food(self, food_id, quantity=1):
        """Adds food to inventory"""
        if food_id not in self.inventory:
            return False
        self.inventory[food_id] += 1
        # TODO: Add back the timestamp
        self.history.append(FoodEvent(food_id))
        return True

    def remove_food(self, food_id, quantity=1):
        self.inventory[food_id] -= 1
        return True

    def get_inventory(self):
        return self.inventory

    def get_food_count(self, food_id):
        return self.inventory[food_id]
