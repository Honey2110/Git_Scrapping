const request = require("request");
const cheerio = require("cheerio")
const fs = require("fs");
const path = require("path");
const pdf = require("pdfkit")

function getIssuesPages(link, topic, name) {
    request(link, function (err, res, html) {
        if (err) {
            console.log(err);
        } else if (res.statusCode == 404) {
            console.log("Page not found");
        } else {
            getIsues(html);
        }
    })

    function getIsues(html) {
        let $ = cheerio.load(html);
        let issueElemArr = $(".Link--primary.v-align-middle.no-underline.h4");
        let arr = [];
        for (let i = 0; i < issueElemArr.length; i++) {
            let link = $(issueElemArr[i]).attr("href");
            let fullink = `https://github.com${link}`
            arr.push(fullink);
        }
        // console.log(topic , " " , arr);
        let folderPath = path.join(__dirname, topic);
        getdir(folderPath);
        let filePath = path.join(folderPath, name + ".pdf")
        let txt = JSON.stringify(arr);
        // fs.writeFileSync(filePath,txt);

        // in pdf form 
        // link for future reference -> https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit/
        let PDFDOC = new pdf;
        PDFDOC.pipe(fs.createWriteStream(filePath));
        PDFDOC.text(txt, 100, 50);
        PDFDOC.end();
    }
}

module.exports = getIssuesPages;

function getdir(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath)
    }
}