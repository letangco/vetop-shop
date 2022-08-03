export const ProductsPayload = {
  index: 'products',
  payload: {
    mappings: {
      properties: {
        id: {
          type: 'text'
        },
        searchString: {
          type: 'text'
        },
        name: {
          type: 'text',
          fielddata: true
        },
        price: {
          type: 'integer'
        },
        storeId: {
          type: 'text'
        },
        quantity: {
          type: 'integer'
        },
        special: {
          type: 'integer'
        },
        model: {
          type: 'text'
        },
        description: {
          type: 'text'
        },
        categories: {
          type: 'text'
        },
        images: {
          type: 'text'
        },
        rate: {
          type: 'integer'
        },
        stock_status: {
          type: 'integer'
        },
        vetic: {
          type: 'text'
        },
        status: {
          type: 'boolean'
        },
        viewed: {
          type: 'integer'
        },
        date: {
          type: 'date'
        }
      }
    }
  }
};
