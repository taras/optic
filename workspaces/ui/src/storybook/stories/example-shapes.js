import { JsonLike } from '../../components/optic-components/shapes/ShapeRenderInterfaces';

export const shapeExamples = [
  {
    shapeId: 'abc',
    jsonType: JsonLike.OBJECT,
    asObject: {
      fields: [
        {
          fieldKey: 'street',
          fieldId: 'abc',
          description: 'this is the street where it happens',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: 'abc',
          description: 'two digit country code. see format x',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: true,
              jsonType: JsonLike.OBJECT,
              asObject: {
                fields: [
                  {
                    fieldKey: 'by_date',
                    fieldId: 'abc',
                    description: 'can it be returned by a date',
                    required: true,
                    shapeRenderers: [
                      {
                        shapeId: 'abc',
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
          fieldId: 'abc',
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: 'abc',
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
    shapeId: 'abc',
    jsonType: JsonLike.STRING,
    value: '400! BAD BAD BAD',
  },
  {
    shapeId: 'abc',
    jsonType: JsonLike.ARRAY,
    asArray: {
      listItem: [
        {
          shapeId: 'abc',
          jsonType: JsonLike.OBJECT,
          asObject: {
            fields: [
              {
                fieldKey: 'username',
                fieldId: 'abc',
                description: '',
                required: true,
                shapeRenderers: [
                  {
                    shapeId: 'abc',
                    value: 'aidan',
                    jsonType: JsonLike.STRING,
                  },
                ],
              },
              {
                fieldKey: 'age',
                fieldId: 'abc',
                description: '',
                required: true,
                shapeRenderers: [
                  {
                    shapeId: 'abc',
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
    shapeId: 'abc',
    jsonType: JsonLike.ARRAY,
    asArray: {
      listItem: [
        {
          shapeId: 'abc string',
          jsonType: JsonLike.STRING,
          value: 'string in here...',
        },
        {
          shapeId: 'abc',
          jsonType: JsonLike.OBJECT,
          asObject: {
            fields: [
              {
                fieldKey: 'username',
                fieldId: 'abc',
                description: '',
                required: true,
                shapeRenderers: [
                  {
                    shapeId: 'abc',
                    value: 'aidan',
                    jsonType: JsonLike.STRING,
                  },
                ],
              },
              {
                fieldKey: 'age',
                fieldId: 'abc',
                description: '',
                required: true,
                shapeRenderers: [
                  {
                    shapeId: 'abc',
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
    shapeId: 'abc',
    jsonType: JsonLike.OBJECT,
    asObject: {
      fields: [
        {
          fieldKey: 'street',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: 'abc',
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: 'abc',
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: 'abc',
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: 'abc',
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: 'abc',
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value:
                "Hallmark is great. Genuine understanding and very professional caring when ordering the sympathy cards from Hallmark. Thank you for your prompt response and delivery of the cards. \n\n\nNeedless to say i'm very thankful for the way i was treated.",
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'street',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: '10 Waterway CT',
              jsonType: JsonLike.STRING,
            },
          ],
        },
        {
          fieldKey: 'zip_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: 267005,
              jsonType: JsonLike.NUMBER,
            },
          ],
        },
        {
          fieldKey: 'country_code',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              jsonType: JsonLike.NULL,
            },
          ],
        },
        {
          fieldKey: 'returnable',
          fieldId: 'abc',
          description: '',
          required: true,
          shapeRenderers: [
            {
              shapeId: 'abc',
              value: true,
              jsonType: JsonLike.BOOLEAN,
            },
          ],
        },
        {
          fieldKey: 'note',
          fieldId: 'abc',
          description: '',
          required: false,
          shapeRenderers: [
            {
              shapeId: 'abc',
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
