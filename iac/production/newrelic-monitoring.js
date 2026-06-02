var assert = require('chai').assert;
// script-wide timeout for all wait and waitandfind functions (in ms)
var default_element_timeout = 190000;   //3 mins
var default_pageload_timeout = 240000; //4 mins
var navlinks = ["footer-menu a", "footer-cr a"];

//sets element load timeout to 3 mins
$browser.manage().timeouts().implicitlyWait(default_element_timeout);
//sets page load timoeout to 4 mins
$browser.manage().timeouts().pageLoadTimeout(default_pageload_timeout);

//test all the main nav page performances
$browser.get("https://viteezy.nl").then(function(){
return $browser.findElement($driver.By.className("header-landing"));
}).then(function(){
  //verifies the nav list has loaded
  return $browser.findElement($driver.By.className("navigation-homepage"));
}).then(function(){
  //loops through the navlinks array
  navlinks.forEach(function(val, i, arr){
  //finds and navigates to each navlink page
  return
$browser.findElement($driver.By.className(navlinks[i])).click().then(function(){
  //verifies that the nav list loaded before moving on
  return $browser.findElement($driver.By.className("submit-button")).then(function(){
    //verifies that the page logo footer at bottom of page has loaded
    return $browser.findElement($driver.By.className("wrapper-footer"));
    })
   })
 })
});