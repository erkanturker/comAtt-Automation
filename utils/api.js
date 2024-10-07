async function waitForSpecificResponse(page, endpoint, method = "GET") {
  return await page.waitForResponse(
    (response) =>
      response.url() === `${process.env.APIURL}/${endpoint}` &&
      response.request().method() === method
  );
}

async function mockApiResponse(page, endpoint, data) {
  await page.route(`${process.env.APIURL}/${endpoint}`, async (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(data),
    });
  });
}
module.exports = { waitForSpecificResponse, mockApiResponse };
