/**
 * 在兑现/拒绝后运行一些最终代码
 */
myPromise
  .then((response) => {
    doSomething(response);
  })
  .catch((e) => {
    returnError(e);
  })
  .finally(() => {
    runFinalCode();
  });
