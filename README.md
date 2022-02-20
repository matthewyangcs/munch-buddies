# munch-buddies

## Running Backend

Navigate to backend folder

- `source venv/bin/activate`
- `export PYTHONPATH=$PWD`
- `pip install fastapi==0.61.1 uvicorn==0.11.8`
- `python app/main.py`

Testing your server is running properly

- `curl -X GET http://localhost:8000/`

## Running Frontend

If you do not already have Expo CLI, install it using this command `npm install --global expo-cli`

Navigate to root level of application

- `npm install`
- `expo start`
- You can either run the app in the iOS simulator or you can run it on your phone with the provided QR code with the app Expo Go
