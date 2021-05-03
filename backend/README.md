# Backend Python API

## Setup
To setup API run these commands from ./backend directory:

For Linux:
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run
```

For Windows:
```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
flask run
```

Server should be up and running on http://localhost:5000

## Testing script

Inside /script directory is a script.py file that sends requests to API and saves a response as an image (/data/dog_script.jpg).
Commands for running script from virtual environment:

For Linux:
```
python3 script/script.py
```

For Windows:
```
python script/script.py
```

## Tests

If you want to run unit tests, run this command from virtual environment:

For Linux:
```
python3 -m pytest
```

For Windows:
```
python -m pytest
```