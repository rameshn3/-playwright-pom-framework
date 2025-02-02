const path = require('path');
const admzip = require('adm-zip');

async function globalTearDown(){
    const reportPath = path.join(__dirname,'html-report');
    const zip = new AdmZip();
    zip.addLocalFolder(reportPath,'./results/html-report');
    zip.writeZip('./results/html-report.zip');
}
module.exports = globalTearDown;