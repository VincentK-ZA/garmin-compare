import { useState, useEffect } from 'react';
import './App.css';
import Album from './pages/home';
// const parser = new DOMParser();

function App() {
  const [searchResults, setSearchResults] = useState();

  const fetchAllWatches = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Connection', 'keep-alive');
    myHeaders.append(
      'sec-ch-ua',
      '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"'
    );
    myHeaders.append('accept', 'application/json');
    myHeaders.append('content-type', 'application/x-www-form-urlencoded');
    myHeaders.append('sec-ch-ua-mobile', '?0');
    myHeaders.append(
      'User-Agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    );
    myHeaders.append('sec-ch-ua-platform', '"Windows"');
    myHeaders.append('Origin', 'https://www.garmin.com');
    myHeaders.append('Sec-Fetch-Site', 'cross-site');
    myHeaders.append('Sec-Fetch-Mode', 'cors');
    myHeaders.append('Sec-Fetch-Dest', 'empty');
    myHeaders.append('Referer', 'https://www.garmin.com/');
    myHeaders.append('Accept-Language', 'en-US,en-ZA;q=0.9,en;q=0.8');

    return fetch(
      'https://qu2pkgfpu2-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)%3B%20JS%20Helper%20(2.28.1)%3B%20vue-instantsearch%201.7.0&x-algolia-application-id=QU2PKGFPU2&x-algolia-api-key=OThkNGU0Y2M1ZDhhNmEzYjk3OGZjMzZmYTI1YTExOTk3ZjcwMWVlMWI5NDM4MmRkNTFlMzhmZTU5NmNiNDE4YWZpbHRlcnM9Tk9UJTIwcHJvZHVjdENhdGVnb3J5TmFtZXMlM0FOT05FJTIwQU5EJTIwcHJvZHVjdExvY2FsZSUzQSUyMGVuX1pBJTIwQU5EJTIwcHJvZHVjdENhdGFsb2dEaXNwbGF5JTNBWkFfQ0FUQUxPRyUyMEFORCUyMHByb2R1Y3RFbmFibGVkJTNBJTIwdHJ1ZSUyMEFORCUyMHByb2R1Y3RWYXJpYXRpb25FbmFibGVkJTNBJTIwdHJ1ZQ%3D%3D',
      {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
          requests: [
            {
              indexName: 'eCommerce',
              params: 'query=watch&offset=0&length=1000&filters=productType%3ADevice'
            }
          ]
        })
      }
    )
      .then((response) => {
        // When the page is loaded convert it to text
        return response.json();
      })
      .then((json) => {
        return json.results[0];
      })
      .catch((err) => {
        console.log('Failed to fetch page: ', err);
        return null;
      });
  };
  // fetchWatchFeatures();

  useEffect(() => {
    if (!searchResults) fetchAllWatches().then((res) => setSearchResults(res));
  });
  return <Album searchData={searchResults}></Album>;

  //   function fetchWatchFeatures(watchUrl) {
  //     FetchPageAsHtmlDoc(watchUrl).then((res) => {
  //       const deviceData = res.getElementById('garmin-app-bootstrap');
  //       let deviceDataScript = deviceData.firstChild.innerHTML;

  //       deviceDataScript = deviceDataScript.replace('var ', 'window.');

  //       var F = new Function(deviceDataScript);

  //       F();

  //       const firstSkuName = Object.keys(window.GarminAppBootstrap.skus)[0];

  //       const specsHtml = window.GarminAppBootstrap.skus[firstSkuName].tabs.specsTab.content;
  //       const specsDoc = parser.parseFromString(specsHtml, 'text/html');

  //       const tables = specsDoc.getElementsByTagName('table');

  //       const specs = [];

  //       for (let i = 0; i < tables.length; i++) {
  //         const table = tables[i];
  //         const rows = table.getElementsByTagName('tr');

  //         const featureSet = {
  //           category: rows[0].getElementsByTagName('td')[0].textContent.trim(),
  //           featureList: []
  //         };
  //         for (let j = 1; j < rows.length; j++) {
  //           const feature = {};

  //           const featureName = rows[j].getElementsByTagName('th')[0].textContent.trim();
  //           let featureValue = rows[j].getElementsByTagName('td')[0].textContent.trim();

  //           if (!featureValue) featureValue = true;

  //           feature[featureName] = featureValue;
  //           featureSet.featureList.push(feature);
  //           // console.log(rows[j].firstChild[0].textContent);
  //         }
  //         specs.push(featureSet);
  //       }

  //       console.log(specs);
  //     });
  //   }
}

// async function FetchPageAsHtmlDoc(url = 'https://www.garmin.com/en-ZA/p/621922') {
//   let fetch_options = {
//     method: 'GET' // *GET, POST, PUT, DELETE, etc.
//     // mode: 'no-cors' // no-cors, *cors, same-origin
//     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     // credentials: 'same-origin', // include, *same-origin, omit
//     // headers: {
//     //   'Content-Type': 'application/json'
//     //   // 'Content-Type': 'application/x-www-form-urlencoded',
//     // }
//   };
//   if (url === 'https://www.garmin.com/en-ZA/p/621922') {
//     return new Promise((resolve) => {
//       var html = mockHtml.replace('CDATA', '555');

//       var doc = parser.parseFromString(html, 'text/html');
//       resolve(doc);
//     });
//   }

//   url = 'https://cors-anywhere.herokuapp.com/' + url;

//   return fetch(url, fetch_options)
//     .then((response) => {
//       // When the page is loaded convert it to text
//       return response.text();
//     })
//     .then((html) => {
//       // Initialize the DOM parser
//       // Parse the text
//       var doc = parser.parseFromString(html, 'text/html');

//       // You can now even select part of that html as you would in the regular DOM
//       // Example:
//       // var docArticle = doc.querySelector('article').innerHTML;

//       return doc;
//     })
//     .catch((err) => {
//       console.log('Failed to fetch page: ', err);
//       return null;
//     });
// }

export default App;
