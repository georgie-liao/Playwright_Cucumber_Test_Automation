const { Before, After, BeforeStep, AfterStep, Status, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { chromium, firefox, webkit, Broswer, broswerContext } = require('@playwright/test');
const { fixture } = require("../hooks/pageFixture");
const { createLogger } = require('winston');
const { options } = require("../helper/util/logger");
const fs = require("fs-extra");

let broswer = Broswer;
let context = broswerContext;

BeforeAll( async function () {
    broswer = await chromium.launch({headless: false});
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name + " " + pickle.id;
    context = await broswer.newContext({
      recordVideo: {
        dir: "test-results/videos"
      }
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName))
  });

//   BeforeStep({tags: "@foo"}, function () {
//     // This hook will be executed before all steps in a scenario with tag @foo
//   });

  AfterStep(async function ({ pickle, result }) {
   //take screenshot if test fail
   if(result?.status == Status.FAILED){
    const img = await fixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type:"png"});
    await this.attach(img, "image/png");
}
  });

  After(async function ({ pickle, result }) {
    //screenshot or video recording if test fail
    let videoPath = String;
    let img = Buffer;
    if(result?.status == Status.FAILED){
        img = await fixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type:"png"});
        videoPath = await fixture.page.video().path();
    }

    await fixture.page.close();
    await context.close();

    if(result?.status == Status.FAILED){
      await this.attach(
        img, "image/png"
        );
      await this.attach(
        fs.readFileSync(videoPath),
        'video/webm'
      );
    }
  });

AfterAll(async function () {
    await broswer.close();
    //pageFixture.logger.close(); //may not needed
})