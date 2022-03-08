const fs = require('fs');
const file = 'data.log';

// initializing empty array to store ip address
const ipFinder = [];
const ipAddress = [];
const uRL = [];


// if not specified utf8 then output will be in buffer format
var readMe = fs.readFileSync(file,'utf8');

// Storing the string of data into array format
const str = readMe.split(/\n/);


// separating the ip address from the str array 
for(let x in str){
    // split the ipaddress from each array
    ipFinder[x] = str[x].split(' - ');
}

// To store ip address from 
for(let x in ipFinder){
    //0 is the index where ip address in stored in ipFinder with rest of data
    ipAddress[x] = ipFinder[x][0];
}

// To store all urls from the given string of data
for(let x in str ){

    /* First we separate each log into array before HTTP and after HTTP 
     Again we split first [0] into two array to get URL 
    which is stored at index 1 after 'GET ' */

    uRL[x] = str[x].split(' HTTP')[0].split('GET ')[1];
}

// To find Unique Ip Address 
function findUniqueIpAddress(ipAddress){
    
    const unique = new Array();
    // Looping through ipAddress starting from first index position
    for(let i=0;i<=ipAddress.length-1;i++){
        let found = true;
      
        for(let j=0;j<=ipAddress.length-1;j++) {
           // To check duplicate ip address
            if(i!=j){
                if(ipAddress[i]== ipAddress[j]){
                    found = false;
                }

            }
        }
        // If duplicate not found then add to unique array 
        if(found == true){
            unique.push(ipAddress[i]);
        }
    }
    return unique;
}

// Method to find top three frequent elements 
function topThreeFrequentElements(element){
     
    // declaring the map function
    const topElements = new Map();
    // Looping through arry of elements 
    for(let i =0;i<=element.length-1;i++){
        //initialzing count 
        count = 1;
         
        //condition to check if elment already exist in map 
        if(!topElements.has(element[i])){

            for(let j=i+1;j<=element.length;j++){
                let found = false;
            // condition to check if element has duplicate in array 
            if(element[i]==element[j]){
                count++;
                
                if(topElements.has(element[i])){

                    topElements.set(element[i],count);
                }
                else{
                    topElements.set(element[i],2);
                }
            }

            }

        }

    }
    //intializing empty array 
    const result = [];
    //converting map to array for filtering 
    const arrSort = Array.from(topElements);
    // sorting the array based on decending order 
    arrSort.sort(function(a,b){
        return b[1] - a[1];
    })
   // looping through sorted array to find top three frequent elements 
    for( let i =0;i<3;i++){
        result.push(arrSort[i]);
    }

    return result;
}


// assigning the return of array of UniqueIP elements from method
let uniqueIP = findUniqueIpAddress(ipAddress);
console.log("Unique IP Address :");
for( let x in uniqueIP){
    
    console.log(uniqueIP[x]);
}
// assigning the return of array of top three frequent URL elements from method
let topFrequentURL = topThreeFrequentElements(uRL);
console.log("Top Three Frequent URL's :");
for(let x in topFrequentURL){
    console.log(topFrequentURL[x]);
}

// assigning the  return of array of top three frequent IP Address elements from method
let topIPAddress = topThreeFrequentElements(ipAddress);
console.log("Top Three most visited IPAddress :");
for(let x in topIPAddress){
    console.log(topIPAddress[x]);
}

