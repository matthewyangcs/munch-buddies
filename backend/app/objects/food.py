"""Contains Nutrient Enum and Food Class"""

from enum import Enum

# https://www.healthline.com/nutrition/50-super-healthy-foods#fruit


class Nutrient(Enum):
    VITAMIN_C = "vitamin-c"
    VITAMIN_E = "vitamin-e"
    VITAMIN_D = "vitamin-d"
    VITAMIN_B = "vitamin-b"
    VITAMIN_K = "vitamin-k"
    ANTIOXIDANT = "antioxidant"
    POTASSIUM = "potassium"
    CALORIES = "calories"
    PROTEIN = "protein"
    FAT = "fat"
    IRON = "iron"
    OMEGA_3 = "omega-3"
    MAGNESIUM = "magnesium"
    FIBER = "fiber"
    GRAINS = "grains"


class Food:
    def __init__(
        self,
        id_: str,
        nutrients: set[Nutrient],
        size: int = 1,
        description: str = "food test description",
    ):
        self.id_ = id_
        self.nutrients: set[str] = nutrients
        self.size = size
        self.description: str = description

    def to_dict(self):
        return {
            "id_": self.id_,
            "nutrients": self.nutrients,
            "size": self.size,
            "description": self.description,
        }


FOOD_NAME_TO_OBJ: dict[str, Food] = {
    # fruits
    "apple": Food("apple", nutrients={Nutrient.VITAMIN_C, Nutrient.ANTIOXIDANT}),
    "avocado": Food(
        "avacado",
        nutrients={Nutrient.VITAMIN_C, Nutrient.POTASSIUM, Nutrient.VITAMIN_E},
    ),
    "banana": Food("banana", nutrients={Nutrient.POTASSIUM, Nutrient.VITAMIN_B}),
    "blueberry": Food("blueberry", nutrients={Nutrient.ANTIOXIDANT}),
    "orange": Food("orange", nutrients={Nutrient.VITAMIN_C, Nutrient.ANTIOXIDANT}),
    "strawberry": Food(
        "strawberry", nutrients={Nutrient.VITAMIN_C, Nutrient.ANTIOXIDANT}
    ),
    "egg": Food("egg", nutrients={Nutrient.VITAMIN_C, Nutrient.PROTEIN, Nutrient.FAT}),
    "beef": Food("beef", nutrients={Nutrient.IRON, Nutrient.PROTEIN, Nutrient.FAT}),
    "chicken_breast": Food(
        "chicken_breast", nutrients={Nutrient.PROTEIN, Nutrient.FAT}
    ),
    "lamb": Food("lamb", nutrients={Nutrient.FAT, Nutrient.PROTEIN, Nutrient.OMEGA_3}),
    "almond": Food("almond", nutrients={Nutrient.VITAMIN_E, Nutrient.MAGNESIUM}),
    "walnut": Food("walnut", nutrients={Nutrient.VITAMIN_B, Nutrient.VITAMIN_E}),
    "broccoli": Food("broccoli", nutrients={Nutrient.VITAMIN_C, Nutrient.VITAMIN_K}),
    "carrot": Food("carrot", nutrients={Nutrient.VITAMIN_K}),
    "cucumber": Food("cucumber", nutrients={Nutrient.VITAMIN_K}),
    "tomato": Food("tomato", nutrients={Nutrient.POTASSIUM, Nutrient.VITAMIN_C}),
    "salmon": Food("salmon", nutrients={Nutrient.VITAMIN_D, Nutrient.OMEGA_3}),
    "brown_rice": Food(
        "brown_rice", nutrients={Nutrient.VITAMIN_B, Nutrient.MAGNESIUM}
    ),
    "cheese": Food(
        "cheese", nutrients={Nutrient.FAT, Nutrient.PROTEIN, Nutrient.VITAMIN_B}
    ),
    "milk": Food(
        "milk", nutrients={Nutrient.FAT, Nutrient.PROTEIN, Nutrient.VITAMIN_B}
    ),
    "potato": Food("potato", nutrients={Nutrient.VITAMIN_C}),
    "chocolate": Food(
        "chocolate", nutrients={Nutrient.MAGNESIUM, Nutrient.ANTIOXIDANT}
    ),
}
