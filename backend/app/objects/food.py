"""Contains Nutrient Enum and Food Class"""

from enum import Enum

# https://www.healthline.com/nutrition/50-super-healthy-foods#fruit


class Nutrient(Enum):
    VITAMIN_A = "vitamin-a"
    VITAMIN_B = "vitamin-b"
    VITAMIN_C = "vitamin-c"
    VITAMIN_D = "vitamin-d"
    VITAMIN_E = "vitamin-e"
    VITAMIN_K = "vitamin-k"
    ANTIOXIDANT = "antioxidant"
    POTASSIUM = "potassium"
    PROTEIN = "protein"
    FAT = "healthy-fats"
    IRON = "iron"
    OMEGA_3 = "omega-3"
    MAGNESIUM = "magnesium"
    FIBER = "fiber"
    GRAINS = "grains"
    CALCIUM = "calcium"


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
        nutrients={Nutrient.FIBER, Nutrient.VITAMIN_C, Nutrient.ANTIOXIDANT},
        description="sweet, crunchy, and a great gift for teachers",
    ),
    "avocado": Food(
        "avacado",
        nutrients={
            Nutrient.FIBER,
            Nutrient.FAT,
            Nutrient.VITAMIN_C,
            Nutrient.POTASSIUM,
            Nutrient.VITAMIN_E,
            Nutrient.MAGNESIUM,
        },
        description="creamy avocados perfect for toast",
    ),
    "banana": Food(
        "banana",
        nutrients={
            Nutrient.POTASSIUM,
            Nutrient.VITAMIN_B,
            Nutrient.VITAMIN_C,
            Nutrient.MAGNESIUM,
            Nutrient.FIBER,
        },
        description="ripe bananas straight from the banana tree",
    ),
    "blueberry": Food(
        "blueberry",
        nutrients={Nutrient.ANTIOXIDANT, Nutrient.VITAMIN_K, Nutrient.VITAMIN_C},
        description="what color are blueberries, really?",
    ),
    "orange": Food(
        "orange",
        nutrients={
            Nutrient.VITAMIN_C,
            Nutrient.FIBER,
            Nutrient.ANTIOXIDANT,
            Nutrient.VITAMIN_B,
            Nutrient.CALCIUM,
        },
        description="vitamin c powerhouse from florida",
    ),
    "strawberry": Food(
        "strawberry",
        nutrients={Nutrient.VITAMIN_C, Nutrient.ANTIOXIDANT},
        description="yummy berry rich in vitamin c and perfect for dessert",
    ),
    "egg": Food(
        "bgg",
        nutrients={Nutrient.VITAMIN_C, Nutrient.PROTEIN, Nutrient.FAT},
        description="over easy, sunny side up, hard boiled - how do you like your eggs?",
    ),
    "beef": Food(
        "beef",
        nutrients={Nutrient.IRON, Nutrient.PROTEIN, Nutrient.FAT},
        description="red meat is high in protein and is very delicious!",
    ),
    "chicken_breast": Food(
        "chicken breast",
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
        nutrients={
            Nutrient.VITAMIN_E,
            Nutrient.MAGNESIUM,
            Nutrient.ANTIOXIDANT,
            Nutrient.FIBER,
        },
        description="almonds are a great source of healthy fats",
    ),
    "walnut": Food(
        "walnut",
        nutrients={Nutrient.VITAMIN_B, Nutrient.VITAMIN_E, Nutrient.FIBER},
        description="a tough nut to crack",
    ),
    "broccoli": Food(
        "broccoli",
        nutrients={Nutrient.VITAMIN_C, Nutrient.VITAMIN_K, Nutrient.PROTEIN},
        description="little trees you can eat and are rich in nutrients",
    ),
    "carrot": Food(
        "carrot",
        nutrients={
            Nutrient.VITAMIN_K,
            Nutrient.VITAMIN_C,
            Nutrient.IRON,
            Nutrient.FIBER,
        },
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
        "brown rice",
        nutrients={Nutrient.VITAMIN_B, Nutrient.MAGNESIUM, Nutrient.GRAINS},
        description="highly nutritious and whole grain, brown rice is a great side to any meal",
    ),
    "cheese": Food(
        "cheese",
        nutrients={
            Nutrient.FAT,
            Nutrient.PROTEIN,
            Nutrient.VITAMIN_B,
            Nutrient.CALCIUM,
        },
        description="a great source of calcium and protein - what kind of cheese do you like the most?",
    ),
    "milk": Food(
        "milk",
        nutrients={
            Nutrient.FAT,
            Nutrient.PROTEIN,
            Nutrient.VITAMIN_B,
            Nutrient.CALCIUM,
        },
        description="fresh milk to give you strong bones",
    ),
    "kale": Food(
        "kale",
        nutrients={
            Nutrient.VITAMIN_A,
            Nutrient.VITAMIN_B,
            Nutrient.VITAMIN_K,
            Nutrient.CALCIUM,
            Nutrient.POTASSIUM,
        },
        description="this loose-leafed plant is a great source of all vitamins",
    ),
    "spinach": Food(
        "spinach",
        nutrients={
            Nutrient.VITAMIN_A,
            Nutrient.VITAMIN_C,
            Nutrient.IRON,
            Nutrient.POTASSIUM,
        },
        description="spinach is surprisingly versatile, both as a food and source of nutrition! ",
    ),
    # "potato": Food(
    #     "potato",
    #     nutrients={Nutrient.VITAMIN_C},
    #     description="potatoes are a special type of root called a tuber",
    # ),
    # "chocolate": Food(
    #     "chocolate",
    #     nutrients={Nutrient.MAGNESIUM, Nutrient.ANTIOXIDANT},
    #     description="yummy milk chocolate, melts in your mouth",
    # ),
}
