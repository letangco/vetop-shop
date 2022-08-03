export const UserPayload = {
  index: 'users',
  payload: {
    mappings: {
      properties: {
        id: {
          type: 'text'
        },
        searchString: {
          type: 'text'
        },
        code: {
          type: 'text'
        },
        fullName: {
          type: 'text',
          fielddata: true
        },
        phone: {
          type: 'text'
        },
        email: {
          type: 'text',
          fielddata: true
        },
        avatar: {
          type: 'text'
        }
      }
    }
  }
};
