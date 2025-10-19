// function f1(continuation) {
//   setTimeout(() => {
//     console.log("1");
//     continuation();
//   }, 1000); // 1 second
// }

// function f2(continuation) {
//   setTimeout(() => {
//     console.log("2");
//     continuation();
//   }, 500); // 0.5 seconds
// }

// function main() {
//   f1(() => {
//     f2(() => {
//       console.log("done");
//     });
//   });
// }

// main();

// const f1 = (cb) => {
//   setTimeout(() => {
//     console.log('1');
//     cb();
//   }, 1000);
// };

// const f2 = (cb) => {
//   setTimeout(() => {
//     console.log('2');
//     cb();
//   }, 500);
// };

// const f3 = () => {
//   console.log('done');
// }

// const proxy = () => f2(f3);
// f1(proxy);

// // f1 simulates a network request
// function f1() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("1");
//       resolve();
//     }, 1000); // 1 second
//   });
// }

// // f2 simulates writing to disk/db
// function f2() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("2");
//       resolve();
//     }, 500); // 0.5 seconds
//   });
// }

// // orchestration logic — keeps f1/f2 untouched
// async function main() {
//   await f1();        // do first task
//   await f2();        // then second task
//   console.log("done"); // then final debug/log
// }

// main().catch(console.error);
