import { JsonLike } from '../../components/optic-components/shapes/ShapeRenderInterfaces';

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const shapeExamples = [
  {
    shapeId: makeid(6),
    jsonType: JsonLike.OBJECT,
    asObject: {
      fields: [
        {
          fieldKey: 'street',
          fieldId: makeid(6),
          description: 'this is the street where it happens',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: makeid(6),
          description: 'two digit country code. see format x',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: true,
              jsonType: JsonLike.OBJECT,
              asObject: {
                fields: [
                  {
                    fieldKey: 'by_date',
                    fieldId: makeid(6),
                    description: 'can it be returned by a date',
                    required: true,
                    shapeRenderers: [
                      {
                        shapeId: makeid(6),
                        value: '9/10/11',
                        jsonType: JsonLike.STRING,
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: makeid(6),
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
      ],
    },
  },
  {
    shapeId: makeid(6),
    jsonType: JsonLike.STRING,
    value: '400! BAD BAD BAD',
  },
  {
    shapeId: makeid(6),
    jsonType: JsonLike.ARRAY,
    asArray: {
      listItem: [
        {
          shapeId: makeid(6),
          jsonType: JsonLike.OBJECT,
          asObject: {
            fields: [
              {
                fieldKey: 'username',
                fieldId: makeid(6),
                description: '',
                required: true,
                shapeRenderers: [
                  {
                    shapeId: makeid(6),
                    value: 'aidan',
                    jsonType: JsonLike.STRING,
                  },
                ],
              },
              {
                fieldKey: 'age',
                fieldId: makeid(6),
                description: '',
                required: true,
                shapeRenderers: [
                  {
                    shapeId: makeid(6),
                    value: 67,
                    jsonType: JsonLike.NUMBER,
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  },
  {
    shapeId: makeid(6),
    jsonType: JsonLike.ARRAY,
    asArray: {
      listItem: [
        {
          shapeId: 'abc string',
          jsonType: JsonLike.STRING,
          value: 'string in here...',
        },
        {
          shapeId: makeid(6),
          jsonType: JsonLike.OBJECT,
          asObject: {
            fields: [
              {
                fieldKey: 'username',
                fieldId: makeid(6),
                description: '',
                required: true,
                shapeRenderers: [
                  {
                    shapeId: makeid(6),
                    value: 'aidan',
                    jsonType: JsonLike.STRING,
                  },
                ],
              },
              {
                fieldKey: 'age',
                fieldId: makeid(6),
                description: '',
                required: true,
                shapeRenderers: [
                  {
                    shapeId: makeid(6),
                    value: 67,
                    jsonType: JsonLike.NUMBER,
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  },
  {
    shapeId: makeid(6),
    jsonType: JsonLike.OBJECT,
    asObject: {
      fields: [
        {
          fieldKey: 'street',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: makeid(6),
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: makeid(6),
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: makeid(6),
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: makeid(6),
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: makeid(6),
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: makeid(6),
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: makeid(6),
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: makeid(6),
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
      ],
    },
  },
];
