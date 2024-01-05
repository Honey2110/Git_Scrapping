const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./reposPage")

let url = "https://github.com/topics";

request(url, cb)

function cb(err, res, html) {
    if (err) {
        console.log(err);
    } else if (res.statusCode == 404) {
        console.log("Page not found");
    } else {
        gettopiclink(html);
    }
}

function gettopiclink(html) {
    let $ = cheerio.load(html);
    let LinkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center")
    for (let index = 0; index < LinkElemArr.length; index++) {
        let href = $(LinkElemArr[index]).attr("href");
        let topic = href.split("/").pop();
        let fulllink = `https://github.com${href}`
        getReposPageHtml(fulllink, topic);
    }
}