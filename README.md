# hoodie-51

This repository is a response to [hoodie.js issue 51](https://github.com/hoodiehq/hoodie.js/issues/51).

The code is written to take advantage of ES5 features, and won't run in ES3 environments without polyfills.

## Running tests

I couldn't wrangle the test runner in the orignal repository, so I configured Buster.JS so I could get on with actually writing the code.

The tests are ported from the Jasmine tests and extended to cover more of the behaviour.

### Command line / CI

To run the tests from command line, you will need to have PhantomJS installed.

```bash
$ npm test
# or
$ grunt test
```

### Static web page

You can also run the tests in a regular web page, for this you should install buster

```bash
npm install -g buster
```

```bash
buster static
```

And then load up the tests in your favourite browser using [http://localhost:8282/](http://localhost:8282/)

### Browser runner

```bash
npm install -g buster
```

```bash
# start server
$ buster server

# capture browser(s) via http://localhost:1111

# run tests in captured browsers
$ buster test
```
