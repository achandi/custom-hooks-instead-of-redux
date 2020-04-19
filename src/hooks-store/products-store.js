import { initStore } from './store';

const configureProductStore = () => {
  const actions = {
    TOGGLE_FAV: (currentState, productId) => {
      return {
        products: [...currentState.products].map((obj) =>
          obj.id == productId ? { ...obj, isFavorite: !obj.isFavorite } : obj
        ),
      };
    },
  };

  const initialState = {
    products: [
      {
        id: 'p1',
        title: 'Red Scarf',
        description: 'A pretty red scarf.',
        isFavorite: false,
      },
      {
        id: 'p2',
        title: 'Blue T-Shirt',
        description: 'A pretty blue t-shirt.',
        isFavorite: false,
      },
      {
        id: 'p3',
        title: 'Green Trousers',
        description: 'A pair of lightly green trousers.',
        isFavorite: false,
      },
      {
        id: 'p4',
        title: 'Orange Hat',
        description: 'Street style! An orange hat.',
        isFavorite: false,
      },
    ],
  };

  initStore(actions, initialState);
};

export default configureProductStore;
