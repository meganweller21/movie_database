This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Dev Tools Installed
1. Install the Node Version Manager

```bash 
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash 
```

2. Install Node 10.3.0

```bash 
nvm install 10.3.0
```

3. Set installed version to default version of node

```bash 
nvm alias default 10.3.0
```

4. Intall Yarn 1.3.2

```bash 
npm i -g yarn@1.3.2
```

5. Clone this repository

6. Run yarn to install dependencies and yarn start to run the app
```bash 
moviedb$ yarn 
moviedb$ yarn start
```

## Challenges and Solutions
1. When I first started developing the app, I planned on adding a state management with Redux to hold movie results. Due to the time restriction, I backtracked and decided to not use state management and use the React state to hold results.
2. I have not created a pagination from scratch before and researched several solutions before I ended up using react-paginate. It was easy to use and had simple css styles, it was the last feature I needed to add and didn't have much time left to create my own.

## Design Decisions
1. I made MovieResult its own component so it could be a resuable component if this was a real life 'app'.
2. I added the debounce to the search function so it wouldn't trigger an api call on every key input.

## Future Improvements
1. I would spend some more time designing the search app, making it visually pleasing.
2. I would add in the optional feature, but I ran out of time to fully develop that.
3. Add in the stars for the movie rating, again ran out of time on that so I ended up showing the rating out of 10.
4. Add in some basic testing.
