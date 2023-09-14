import { Siva } from "./src/index";
const app = new Siva();

app.get('/', () => {
  return new Response(JSON.stringify({"name": "lucas", "id": "evb287649b7v862b98v3476b87"}))
});

app.get('/some/some', () => {
  return new Response("Hello world s");
});

app.get('/path/:name', (request) => {
  return Response.json({
    name: request.params.name
  })
})

app.post('/users', async (request) => {
  const body = await request.json();
  console.log(JSON.stringify(body))
  return new Response(JSON.stringify({"message": "recived"}))
})


app.get('/path/some/som/:id', (request) => {
  return Response.json({
    id: request.params.id
  })
})

app.serve({ port: 3000 }, () => {
  console.log("Server on port http://localhost:3000");
});
