import { Siva } from "./src/index";
const app = new Siva();

app.get('/', () => {

  return new Response(JSON.stringify({"name": "lucas", "id": "evb287649b7v862b98v3476b87"}))

  // return new Response("Hello world");
});

app.get('/some/some', () => {
  return new Response("Hello world s");
});

app.get('/path/:name', (request) => {
  return Response.json({
    name: request.params.name
  })
})

app.get('/path/some/som/:id', (request) => {
  return Response.json({
    id: request.params.id
  })
})

app.serve({ port: 3000 }, () => {
  console.log("Server on port http://localhost:3000");
});
