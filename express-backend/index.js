const express = require('express');
const neo4j = require('neo4j-driver');

const app = express();
const port = process.env.PORT || 3000;

const driver = neo4j.driver(
  'bolt://neo4j-container:7687',
  neo4j.auth.basic('neo4j', 'password')
);

app.get('/getNodes', async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run('MATCH (n) RETURN n LIMIT 5');
    const nodes = result.records.map(record => record.get(0).properties);

    res.json(nodes);
  } catch (error) {
    console.error('Error executing Neo4j query:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await session.close();
  }
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
