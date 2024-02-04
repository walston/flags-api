const { spawn } = require("child_process");

function run(job) {
  const command = job.split(" ").shift();
  const child = spawn(command, job.split(" ").slice(1));
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  return () => child.kill("SIGKILL");
}

const react = run("npm run start");
const server = run("npm run server");

process.addListener("beforeExit", () => {
  react();
  server();
});
