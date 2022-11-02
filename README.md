## To open the example site run this commands
```
git clone https://github.com/Bergerivan/regdesk_test.git
cd regdesk_test
npm install
npm start
```
then site http://localhost:3000 will be opened in browser automatically

## There are 5 widgets on the page.

## Each widget can be:
- shown or hidden using the button at the top of the page
- moved using mouse
- resized by dragging right bottom corner

## Each widget contains:
- diagram,
- button to make a new request to get new fake data
- a progress bar that shows how much time is left before the system automatically makes a request for new fake data

## Async requests
System makes async requests to localhost and then replace responses data with randomly generated data for each chart type separately