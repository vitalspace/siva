import { Siva } from "./src/index";
const app = new Siva();

app.get("/", () => {
  return new Response("Hello world");
});

app.get("/some", () => {
  return new Response("hello some");
});

app.serve({ port: 3000 }, () => {
  console.log("Listening on port http://localhost:3000");
});
