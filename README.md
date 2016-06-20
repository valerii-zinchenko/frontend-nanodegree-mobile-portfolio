## Website Performance Optimization portfolio project

### Live links

* [`src`](http://valerii-zinchenko.github.io/frontend-nanodegree-mobile-portfolio/src/index.html)
* [`dest`](http://valerii-zinchenko.github.io/frontend-nanodegree-mobile-portfolio/dest/index.html)

### Part 1: Optimize PageSpeed Insights score for index.html

The following techniques were applied to reduce the CRP and improve the site loading:
* Minify CSS and JS files
* Use "print" media query for `print.css`
* Inline critical and small CSS and JS files into HTML file
* Run all JavaScripts at the end of document's body
* Download fonts and GA stuff asynchronusly from JavaScript at the end of the body after all critical JavaScript routines
* Optimize images for different screen sizes and media qieries (nice example: [pizza.html](http://valerii-zinchenko.github.io/frontend-nanodegree-mobile-portfolio/dest/views/pizza.html))

### Part 2: Optimize Frames per Second in pizza.html

#### Issue #1: Frame rate by scrolling the page

The problem was in `updatePositions` function that  in the big loop was that the `document.body.scrollTop` was accessed every loop iteraction. So I have moved out all the code that can be done once and have leaved only that code that updates the element's styles. For comparision relative to my laptop, before the fix the average was about 150ms, after - 2-4ms.

#### Issue #2: Computational efficiency

The problem was that by changing the size of the pizza the content update took a lot of time. So problem function was `resizePizzas`. The following issues I found and fixed there:
* unnecessary access ot the element's styles in loops
* lot of code duplication
* unnecessary creation of function inside of this function

Before the fix, it was about 300ms on mt laptop, after - 3-4ms.

Great improvements, I would say. Now pizza.html is much more smother than before :)

### Build and run

#### Build all from `src`

To build `dest` from the `src` folder you should run
```
$ npm install
$ grunt
```
It will autimatically:
* minify CSS and JS files
* process imroved HTML files (with `_improved` suffix), i.e. inline resources
* generate images with different sizes

#### Run

Simple hand-written node.js server is available. To run the site from `localhost` just type

```
node web-server.js
```

and you will see in the command line where it is started

#### Run with `ngrok`

Install `ngrok`
```
npm install ngrok -g
```

Start local server (described above) and start `ngrok`
```
ngrok http 8080
```
where 8080 is port of your local server
