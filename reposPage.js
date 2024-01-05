const request = require("request");
const cheerio = require("cheerio")
const getIssuesPages = require("./issues.js")

function getReposPageHtml(link, topic) {
    request(link, function (err, res, html) {
        if (err) {
            console.log(err);
        } else if (res.statusCode == 404) {
            console.log("Page not found");
        } else {
            getReposLink(html);
        }
    })
    function getReposLink(html) {
        let $ = cheerio.load(html);
        let headingArr = $(".f3.color-fg-muted.text-normal.lh-condensed");
        // console.log(topic);
        for (let i = 0; i <= 10; i++) {
            let twoAnchor = $(headingArr[i]).find("a");
            let link = $(twoAnchor[1]).attr("href")
            let fullink = `https://github.com${link}/issues`
            // console.log(fullink);
            let repoName = link.split("/").pop()
            getIssuesPages(fullink, topic,repoName);
        }
        // console.log("`````````");
    }

}

module.exports = getReposPageHtml;
