import Loadable from 'react-loadable';

import React from 'react';

import { Loader, } from 'semantic-ui-react';

export default Loadable({
  loader: () => import('isomerism/routes/Game'),
  loading: Loader,
});
