const models = require('../../models')

module.exports = (app) => {
  app.get('/api/v1/hub/clients', async (req, res) => {
    const clients = await models.g5_updatable_client.findAll({
      where: {
        properties: {
          status: {
            [models.Sequelize.Op.not]: 'Deleted'
          },
          g5_internal: false
        }
      },
      attributes: [
        'name',
        'urn',
        [models.sequelize.json('properties.branded_name'), 'branded_name']
      ],
      order: [['name', 'ASC']]
    });
    console.info(clients.length);
    res.json(clients);
  })
}
