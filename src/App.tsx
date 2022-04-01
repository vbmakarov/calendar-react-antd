import React from 'react';
import {Layout} from "antd";
import HeaderComponent from "./components/header/HeaderComponent";
import {Routers} from './routes/Routers'

function App(): JSX.Element{
  return (
        <Layout>
            <HeaderComponent/>
            <Routers/>
        </Layout>
  );
}

export default App;
