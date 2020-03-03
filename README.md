# The Game of Life

This repository houses the source code for the CyberCube test assignment. It is realized as a React app and further technical documentation can be found inside the app itself under the 'Technical information' menu item.

## The idea

The landing page of the app is the Game of Life itself. Simply click anywhere on the board to add a random pattern of live cells and watch them animate through generations. You can change the speed of the simulation using the slider below the plane.

## Demo

There is a demo instance You can check out deployed to [my server](https://gol.verrev.xyz).

## Development mode

To run the app locally, make sure you have **npm**, **node** and **yarn**.
The environment this app was developed on was

```bash
$ node -v
v13.9.0

$ npm -v
6.13.7

$ yarn -v
1.10.1
```

To easily set the version of node, You can use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install node # set node to the latest version, or alternatively
nvm install node v13.9.0 # to set it to the specific version
```

After this, while standing in the root of this repository, run

```bash
yarn
```

to populate node_modules with the necessary dependancies. When this is done, You are ready to run the app locally (port 8080):

```bash
yarn start
```

Finally, point Your browser to http://localhost:8080 and enjoy 😉.

## Questions?

In the event You find something lacking or not clear, hit me up at [vootele@verrev.xyz](mailto:vootele@verrev.xyz). Thanks!
