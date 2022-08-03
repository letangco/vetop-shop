export const StorePayload = {
    index: 'stores',
    payload: {
      mappings: {
        properties: {
          id: {
            type: 'text'
          },
          userId: {
            type: 'text'
          },
          searchString: {
            type: 'text'
          },
          name: {
            type: 'text',
            fielddata: true
          },
          code: {
            type: 'text',
            fielddata: true
          },
          description: {
            type: 'text'
          },
          storeCategories: {
            type: 'text'
          },
          phone: {
            type: 'text'
          },
          rate: {
            type: 'integer'
          },
          address: {
            type: 'text'
          },
          status: {
            type: 'integer'
          },
          company: {
            type: 'text'
          },
          stateId: {
            type: 'text'
          },
          countryId: {
            type: 'text'
          },
          loc: {
            type: 'text'
          },
          totalProduct: {
            type: 'integer'
          }
        }
      }
    }
  };
