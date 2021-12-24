import React from 'react';

import Routes from "../routes";
import {AuthProvider} from "../authProvider";



const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Providers
