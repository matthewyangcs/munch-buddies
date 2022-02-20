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
    "apple": Food(
        "apple",
        nutrients={Nutrient.VITAMIN_C, Nutrient.ANTIOXIDANT},
        description="sweet, crunchy, and high in vitamin c and antioxidants",
    ),
    "avocado": Food(
        "avacado",
        nutrients={Nutrient.VITAMIN_C, Nutrient.POTASSIUM, Nutrient.VITAMIN_E},
        description="creamy avocados perfect for toast",
    ),
    "banana": Food(
        "banana",
        nutrients={Nutrient.POTASSIUM, Nutrient.VITAMIN_B},
        description="ripe bananas straight from the banana tree",
    ),
    "blueberry": Food(
        "blueberry",
        nutrients={Nutrient.ANTIOXIDANT},
        description="what color are blueberries, really?",
    ),
    "orange": Food(
        "orange",
        nutrients={Nutrient.VITAMIN_C, Nutrient.ANTIOXIDANT},
        description="vitamin c powerhouse from florida",
    ),
    "strawberry": Food(
        "strawberry",
        nutrients={Nutrient.VITAMIN_C, Nutrient.ANTIOXIDANT},
        description="yummy berry rich in vitamin c and perfect for dessert",
    ),
    "egg": Food(
        "egg",
        nutrients={Nutrient.VITAMIN_C, Nutrient.PROTEIN, Nutrient.FAT},
        description="over easy, sunny side up, hard boiled - how do you like your eggs?",
    ),
    "beef": Food(
        "beef",
        nutrients={Nutrient.IRON, Nutrient.PROTEIN, Nutrient.FAT},
        description="red meat is high in protein and is very delicious!",
    ),
    "chicken_breast": Food(
        "chicken_breast",
        nutrients={Nutrient.PROTEIN, Nutrient.FAT},
        description="high in protein and low in fat, this is a popular choice for athletes!",
    ),
    "lamb": Food(
        "lamb",
        nutrients={Nutrient.FAT, Nutrient.PROTEIN, Nutrient.OMEGA_3},
        description="tasty lamb high in protein",
    ),
    "almond": Food(
        "almond",
        nutrients={Nutrient.VITAMIN_E, Nutrient.MAGNESIUM},
        description="almonds are a great source of healthy fats",
    ),
    "walnut": Food(
        "walnut",
        nutrients={Nutrient.VITAMIN_B, Nutrient.VITAMIN_E},
        description="a tough nut to crack",
    ),
    "broccoli": Food(
        "broccoli",
        nutrients={Nutrient.VITAMIN_C, Nutrient.VITAMIN_K},
        description="little trees you can eat and are rich in nutrients",
    ),
    "carrot": Food(
        "carrot",
        nutrients={Nutrient.VITAMIN_K},
        description="bright orange carrots that may or may not improve your vision",
    ),
    "cucumber": Food(
        "cucumber",
        nutrients={Nutrient.VITAMIN_K},
        description="fun fact: cucumbers are 95% water!",
    ),
    "tomato": Food(
        "tomato",
        nutrients={Nutrient.POTASSIUM, Nutrient.VITAMIN_C},
        description="tomato cooked with eggs is a popular Chinese dish and jam packed with vitamins!",
    ),
    "salmon": Food("salmon", nutrients={Nutrient.VITAMIN_D, Nutrient.OMEGA_3}),
    "brown_rice": Food(
        "brown_rice",
        nutrients={Nutrient.VITAMIN_B, Nutrient.MAGNESIUM},
        description="brown rice is a great side to any meal",
    ),
    "cheese": Food(
        "cheese",
        nutrients={Nutrient.FAT, Nutrient.PROTEIN, Nutrient.VITAMIN_B},
        description="what kind of cheese do you like the most?",
    ),
    "milk": Food(
        "milk",
        nutrients={Nutrient.FAT, Nutrient.PROTEIN, Nutrient.VITAMIN_B},
        description="fresh milk to give you strong bones",
    ),
    "potato": Food(
        "potato",
        nutrients={Nutrient.VITAMIN_C},
        description="potatoes are a special type of root called a tuber",
    ),
    "chocolate": Food(
        "chocolate",
        nutrients={Nutrient.MAGNESIUM, Nutrient.ANTIOXIDANT},
        description="yummy milk chocolate, melts in your mouth",
    ),
}
