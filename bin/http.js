const app = require('../app')
const { PORT } = require('../app/config/config')

app.listen(PORT, () => {
  console.log(`Example app listening on ${PORT}`);
})
