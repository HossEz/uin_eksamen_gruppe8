export default {
  name: 'spill',
  title: 'Spill',
  type: 'document',
  fields: [
    {
      name: 'tittel',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'tittel',
        maxLength: 200,
      },
    },
    {
      name: 'apiId',
      title: 'API ID',
      type: 'number',
    },
    {
      name: 'timerSpilt',
      title: 'Timer Spilt',
      type: 'number',
    },
    {
        name: 'sjangere',
        title: 'Sjangere',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'sjanger' }] }],
      },
    {
      name: 'favoritt',
      title: 'Favoritt',
      type: 'boolean',
    },
  ],
};
