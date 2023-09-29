const { Before, After, BeforeStep, AfterStep, Status, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { chromium, firefox, webkit, Broswer, broswerContext } = require('@playwright/test');
const { pageFixture } = require("../hooks/pageFixture");
const { createLogger } = require('winston');
const { options } = require("../helper/util/logger");

let broswer = Broswer;
let context = broswerContext;

BeforeAll( async function () {
    broswer = await chromium.launch({headless: false});
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name + " " + pickle.id;
    context = await broswer.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
    pageFixture.logger = createLogger(options(scenarioName))
  });

//   BeforeStep({tags: "@foo"}, function () {
//     // This hook will be executed before all steps in a scenario with tag @foo
//   });

  AfterStep(async function ({ pickle, result }) {
   //take screenshot if test fail
   if(result?.status == Status.FAILED){
    const img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type:"png"});
    await this.attach(img, "image/png");
}
  });

  After(async function ({ pickle, result }) {
    //take screenshot if test fail
    if(result?.status == Status.FAILED){
        const img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type:"png"});
        await this.attach(img, "image/png");
    }

    await pageFixture.page.close();
    await context.close();
  });

AfterAll(async function () {
    await broswer.close();
    pageFixture.logger.close();
})