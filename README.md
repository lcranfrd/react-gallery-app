App for TreeHouse FS Tech Degree Project #7 React Gallery App
Display photos from Flickr API.
There are two methods to choose from to make this app work with your own Flickr API Key.

Method 1)
create a 'config.js' file in the 'src' directory with the following structure:

***
const Config = 
  {
    api_key: "Your flickr Api Key here"
  }

export default Config;
***
***
Methood 2)
In App.js
Comment out the import statement for the ./config.js in line 18.
Replace api_key key's value with your api key value in line 54, in the fetchOptions object.
***

Changes made for Exceeds Expectations are the addition of a modal which allows the user
to view larger versions of the photos by clicking on them individually in the gallery.
Animation has been provided with calls to Animate.css cdn imported via the App.css file.
Background colors have been modified. 
