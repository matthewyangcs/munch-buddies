from typing import Iterable
from .food import Food, Nutrient
from enum import Enum


class Nickname(Enum):
    BEAR = "Vitamin-B Bear"
    CAT = "Vitamin Cat"
    DEER = "Antioxidant Deer"
    DOG = "Vitamin Dog"
    FOX = "Healthy Fox"
    RACCOON = "Fiber Racoon"
    PANDA = "Potassium Panda"
    SHEEP = "Magnesium Sheep"
    SKUNK = "Omega-3 Skunk"
    TIGER = "Iron Tiger"
    WOLF = "Protein Wolf"


class Animal:
    def __init__(
        self,
        id_: str,  # ID is the enum key
        display_name: str = "",
        valid_nutrients: set[Nutrient] = [],
        level: int = 1,
        progress: int = 0,
        unlocked: bool = True,
        description: str = "test description",
    ):
        """The name behaves as the animal's id"""
        self.id_: str = id_
        self.display_name = display_name or Nickname[id_]
        self.valid_nutrients: set[Nutrient] = valid_nutrients
        self.level: int = level
        self.progress: int = progress
        self.food_history: list[Food] = []
        self.unlocked: bool = unlocked
        self.description: str = description

    #######################
    ## Private Methods
    def _level_up_req(self):
        """Returns how much progress is needed for next level"""
        return 50 * self.level

    #######################
    ## Public APIs below
    def can_eat(self, food: Food):
        for nutrient in food.nutrients:
            if nutrient in self.valid_nutrients:
                return True

        return False

    def eat_food(self, food: Food, quantity: int = 1):
        """Returns True if the food was successfully eaten"""
        if not self.can_eat(food):
            return False
        self.food_history.append(food)
        self.progress += 50 * quantity * food.size
        while self.progress >= self._level_up_req():
            self.progress -= self._level_up_req()
            self.level += 1

        return True

    def get_valid_nutrients(self):
        return self.valid_nutrients

    def get_progress_level(self):
        """Tuple of progress integer, need self.level to level up"""
        return (self.progress, self._level_up_req)

    def get_food_history(self):
        return self.food_history

    def to_dict(self):
        return {
            "id": self.id_,
            "display_name": self.display_name,
            "valid_nutrients": self.valid_nutrients,
            "level": self.level,
            "progress": self.progress,
            "level_up_req": self._level_up_req(),
            "unlocked": self.unlocked,
            "description": self.description,
        }


ANIMAL_NAME_TO_OBJ: dict[str, Animal] = {
    Nickname.BEAR.name: Animal(
        Nickname.BEAR.name,
        valid_nutrients={Nutrient.VITAMIN_B, Nutrient.FAT, Nutrient.CALCIUM},
        description="Vitamin-B Bear loves to drink milk to strengthen his brain! For snacks, also he enjoys many foods high in calcium!",
    ),
    Nickname.CAT.name: Animal(
        Nickname.CAT.name,
        valid_nutrients={Nutrient.VITAMIN_C},
        description="Vitamin Cat thinks Vitamin-C is the best because it's in all her favorite fruits, like oranges and strawberries. Getting this essential nutrient that hold our bodies together is so sweet!",
    ),
    Nickname.DEER.name: Animal(
        Nickname.DEER.name,
        valid_nutrients={Nutrient.ANTIOXIDANT},
        description="Antioxidants may sound scary, but they protect our bodies from diseases like cancer. Antioxidant deer loves finding wild blueberries in the forest.",
    ),
    Nickname.DOG.name: Animal(
        Nickname.DOG.name,
        valid_nutrients={Nutrient.VITAMIN_D, Nutrient.VITAMIN_B},
        description="Dogs love bones, and Vitamin Dog loves the vitamin that keeps our bones strong and healthy. He loves salmon, and wants to go fishing with Vitamin-B Bear one day!",
    ),
    Nickname.FOX.name: Animal(
        Nickname.FOX.name,
        valid_nutrients={Nutrient.VITAMIN_K, Nutrient.IRON, Nutrient.FIBER},
        description="Healthy fox loves vegetables like carrots or cucumbers. They're a fresh snack with a lot of vitamin-(K)runch!",
    ),
    Nickname.RACCOON.name: Animal(
        Nickname.RACCOON.name,
        valid_nutrients={Nutrient.FIBER},
        description="Fiber is important for our body, and luckily for Fiber Raccoon it helps control blood sugar levels and lowers cholestrol. He likes eating foods like avocados and bananas.",
    ),
    Nickname.PANDA.name: Animal(
        Nickname.PANDA.name,
        valid_nutrients={Nutrient.POTASSIUM, Nutrient.VITAMIN_C},
        description="Potassium Panda loves foods like bananas and avocados, as Potassium is an essential mineral that is needed because it activates various cells and nerve functions!",
    ),
    Nickname.SHEEP.name: Animal(
        Nickname.SHEEP.name,
        valid_nutrients={Nutrient.MAGNESIUM, Nutrient.IRON},
        description="Magnesium is very important for cells to function. Magnesium sheep maintains a healthy body with lots of magnesium and other minerals!",
    ),
    Nickname.SKUNK.name: Animal(
        Nickname.SKUNK.name,
        valid_nutrients={Nutrient.OMEGA_3, Nutrient.VITAMIN_D, Nutrient.VITAMIN_E},
        description="Omega-3 is a type of fatty acid that keeps your eyes and brain healthy. Omega-3 Skunk loves salmon!",
    ),
    Nickname.TIGER.name: Animal(
        Nickname.TIGER.name,
        valid_nutrients={Nutrient.IRON, Nutrient.PROTEIN, Nutrient.FAT},
        description="Iron is crucial for making red blood cells that transport oxygen throughout your body. Iron Tiger stays healthy by eating iron-rich food like beef.",
    ),
    Nickname.WOLF.name: Animal(
        Nickname.WOLF.name,
        valid_nutrients={Nutrient.PROTEIN, Nutrient.VITAMIN_D, Nutrient.IRON},
        description="Whenever Vitamin-D Dog wants to find his cousin, he looks for him at the gym. Protein Wolf eats a big meal of chicken breast and eggs with a glass of milk after the gym to help his muscles grow.",
    ),
}
